import { get, post } from "../config"

export const fetchArticleList = (data?: any) => {
  return post("/reception/article/list", data)
}

export const fetchArticleCategoryList = (params?: any) => {
  return get('/reception/article/getAndCountCategory', params)
}

export const fetchArticleRecentList = (params?: any) => {
  return get("/reception/article/getRecentArticle", params)
}

export const fetchArticleTagList = (data?: any) => {
  return get('/reception/tag/getTags', data)
}

export const fetchArticleById = (data: any) => {
  return post("/reception/article/single", data)
}
