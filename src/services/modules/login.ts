import { LoginInfo } from "@/common/interface/login"
import { post } from "../config"

// 登录验证
export const userLoginVerify = (data: LoginInfo) => {
  return post("/reception/user/login", data)
}

// 注册用户
export const userRegister = (data: LoginInfo) => {
  return post("/reception/user/register", data)
}

// 验证用户是否已登录
export const isLoginStatus = (data?: any) => {
  return post("/reception/user/verify", data)
}

export const logOutAction = (data?: any) => {
  return post("/reception/user/logout", data)
}

export const updateUserInfo = (data: any) => {
  return post('/reception/user/update', data)
}

export const updatePWD = (data: any) => {
  return post('/reception/user/pwd', data)
}