import axios from 'axios'
 function requestConfig(path) {
    let instance = axios.create({
        baseURL:'http://39.107.50.117:3000',
        timeout:5000
    })
    return instance({
        url:path
    })
}
function PageConfig(path,parmas) {
    let instance = axios.create({
        baseURL:'http://39.107.50.117:3000',
        timeout:5000
    })
    // instance.interceptors.request.use(config => {
    //     return config
    // })
    return instance({
        url:path,
        params:parmas
    })
}
function PublishMessage(path,data) {
    let instance = axios.create({
        baseURL:'http://39.107.50.117:3000',
    })
    return instance({
        url:path,
        method:"post",
        data:data
    })
}
export { requestConfig,PublishMessage,PageConfig }