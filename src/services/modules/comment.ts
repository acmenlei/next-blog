import { get, post } from "../config"

export const queryComments =  (data: any) => {
  return post("/reception/comment/queryComments", data)
}

export const publishComment = (data: any) => {
  return post("/reception/comment/publish", data)
}

export const delComment = (data: any) => {
  return post("/reception/comment/remove", data)
}

export const replyComment = (data: any) => {
  return post("/reception/comment/reply", data)
}