export default {
  consoleRequestParams: function (url, options) {
    var params = this.getRequestParams(options)
    console.log(url + ' requestParams:\r\n' + JSON.stringify(params, null, 4))
  },

  getRequestParams: function (options) {
    var type = options.type
    var url = options.url
    var body = options.body
    var params = {}

    switch (type) {
      case 'POST':
        if (body instanceof FormData) {
          body.forEach(function (value, key) {
            params[key] = value
          })
        } else {
          try {
            params = JSON.parse(body)
          } catch (e) {
            var requestBody = decodeURIComponent(body)
            var keyValueArray = requestBody.split('&')
            keyValueArray.forEach(function (keyValue) {
              var key = keyValue.split('=')[0]
              var value = keyValue.split('=')[1]
              try {
                value = JSON.parse(keyValue.split('=')[1])
              } catch (e) {
                value = keyValue.split('=')[1]
              }
              if (params[key]) {
                if (Object.prototype.toString.call(params[key]) === '[object Array]') {
                  params[key].push(value)
                } else {
                  params[key] = [params[key], value]
                }
              } else {
                params[key] = value
              }
            })
          }
        }
        break
      case 'GET':
        if (url.indexOf('?') >= 0) {
          var query = url.substr(url.indexOf('?') + 1)
          var vars = query.split('&')
          for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=')
            // If first entry with this name
            if (typeof params[pair[0]] === 'undefined') {
              params[pair[0]] = decodeURIComponent(pair[1])
              // If second entry with this name
            } else if (typeof params[pair[0]] === 'string') {
              var arr = [params[pair[0]], decodeURIComponent(pair[1])]
              params[pair[0]] = arr
            } else {
              params[pair[0]].push(decodeURIComponent(pair[1]))
            }
          }
        }
    }

    return params
  }
}
