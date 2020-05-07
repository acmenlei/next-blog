import axios from 'axios'
axios.defaults.withCredentials = true;
 function requestConfig(path) {
    let instance = axios.create({
        baseURL:'http://codelei.cn:3000',
        timeout:6000
    })
    return instance({
        url:path
    })
}
function PageConfig(path,parmas) {
    let instance = axios.create({
        baseURL:'http://codelei.cn:3000',
        timeout:6000
    })
    return instance({
        url:path,
        params:parmas
    })
}
function PublishMessage(path,data) {
    let instance = axios.create({
        baseURL:'http://codelei.cn:3000',
    })
    return instance({
        url:path,
        method:"post",
        data:data
    })
}
export { requestConfig,PublishMessage,PageConfig }