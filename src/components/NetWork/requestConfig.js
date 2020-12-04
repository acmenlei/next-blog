import axios from "axios";
import store from '../../store/index'
const baseURL = store.state.baseURL;

axios.defaults.withCredentials = true;

function requestConfig(path) {
  let instance = axios.create({
    baseURL: baseURL, // 换成你自己的后台地址
    timeout: 10000,
  });
  return instance({
    url: path,
  });
}
function PageConfig(path, parmas) {
  let instance = axios.create({
    baseURL: baseURL, // 换成你自己的后台地址
    timeout: 10000,
  });
  return instance({
    url: path,
    params: parmas,
  });
}
function PublishMessage(path, data) {
  let instance = axios.create({
    baseURL: baseURL,// 换成你自己后台地址
  });
  return instance({
    url: path,
    method: "post",
    data: data
  });
}

export { requestConfig, PublishMessage, PageConfig };