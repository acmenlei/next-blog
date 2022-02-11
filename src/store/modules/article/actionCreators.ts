import { ActionExtenal } from "@/common/interface/action"
import { ActionTypes } from "./constants"

// counter test
export const getArticleListAction = (data?: any): ActionExtenal => {
  return {
    type: ActionTypes.FETCH_ARTICLE_LIST,
    data
  }
}