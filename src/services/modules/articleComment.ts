import { post } from "../config"

export const articleCommentPublish = (data: any) => {
  return post("/reception/articleComment/publish", data)
}

export const fetchAllArticleCommentList = (data: any) => {
  return post("/reception/articleComment/queryAllArticleCommentsById", data)
}

export const deleteArticleCommentById = (data: any) => {
  return post("/reception/articleComment/remove", data)
}

export const articleCommentReply = (data: any) => {
  return post("/reception/articleComment/reply", data)
}