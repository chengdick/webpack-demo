import Mock from 'mockjs'
import utils from './utils'
Mock.mock('/query', function(req){
    let queryOptions = utils.getRequestParams(req);
    console.log(queryOptions)
    return Mock.mock({
        code: 0,
        message: "error",
        result: {
            "userId|1": ['100001', '100002', '100003'],
            key: 'value'
        }
    })
})