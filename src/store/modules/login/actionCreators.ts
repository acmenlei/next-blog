import { ActionTypes } from "./constants";

export const userLoginAction = (data: any) => ({ type: ActionTypes.USER_LOGIN, data })
// export const userRegisterAction = (data: any) => ({ type: ActionTypes.USER_REGISTER, data })

export  const changeUserInfoAction = () => ({ type: ActionTypes.EXIT })