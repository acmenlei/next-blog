import axios from "axios";
import store from "@/store"
import { hideLoadingAction, showLoadingAction } from "@/store/modules/home/actionCreators";
import { errorMessage } from "@/common/message";
import { CustomAxiosResponse } from "@/common/interface/axios";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use((config) => {
  store.dispatch(showLoadingAction())
  return config;
})

// 解构data
service.interceptors.response.use((data) => {
  store.dispatch(hideLoadingAction())
  return data.data;
})

// get请求配置
export const get = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    service.get(url, params).then((res: CustomAxiosResponse) => {
      resolve(res);
    }, err => {
      errorMessage("网络错误")
      store.dispatch(hideLoadingAction())
      reject(new Error(err))
    })
  })
}
// post请求配置
export const post = (url: string, data: any = {}) => {
  return new Promise((resolve, reject) => {
    service.post(url, data).then((res: CustomAxiosResponse) => {
      resolve(res);
    }, err => {
      errorMessage("网络错误")
      store.dispatch(hideLoadingAction())
      reject(new Error(err))
    })
  })
}