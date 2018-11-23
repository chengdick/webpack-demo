const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');
console.log(process.env.NODE_ENV)

function resolve(dir){
    return path.join(__dirname, dir)
}

function assetsPath(_path) {
    return path.posix.join('static', _path);
  }

let entryApp ={
    entry:{
        mock:resolve("./mock.js"),
        app: resolve("./app.js")
    }
}
let entryMock = {
    entry:{
        app: resolve("./app.js")
    }
}

const webpackObj = merge(process.env.NODE_ENV=='mock'? entryApp:entryMock,{
    mode: 'production',
    output: {
        path: resolve("./dist"),
        filename: assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: assetsPath('js/[id].[chunkhash].js'),
        publicPath: './',
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      alias: {
        '@': path.join(__dirname, './src'),
        pages: path.join(__dirname, './src/pages'),
        utils: path.join(__dirname, './src/utils'),
        common: path.join(__dirname, './src/common')
      }
    },
    module: {
    rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,//注意这边
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                    loader: 'html-loader',
                    options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: assetsPath('img/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: assetsPath('media/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        }),
        new CleanWebpackPlugin(['dist', 'build'], {
            root: __dirname,
            verbose: true,
            dry: false
          }),
        new MiniCssExtractPlugin({
            filename: assetsPath("css/[name][chunkhash].css"),////都提到build目录下的css目录中
            chunkFilename: assetsPath("[id][chunkhash].css")
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
}) 

module.exports = webpackObj