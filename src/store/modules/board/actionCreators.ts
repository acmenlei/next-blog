import { ActionTypes } from "./constants";

// 请求评论数据
export const requestCommentListAction = (data: any) => ({ type: ActionTypes.REQUST_COMMENT_LIST, data })
