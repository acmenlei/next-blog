import { ActionExtenal } from "@/common/interface/action";
import { Map } from "immutable";
import { ActionTypes } from "./constants";

const initialState = Map({
  commentsList: null,
  total: 0
})


function reducer(state = initialState, action: ActionExtenal) {
  switch (action.type) {
    case ActionTypes.REQUST_COMMENT_LIST:
      // console.log("设置commentslsit数据", action.data.data)
      return state.set("commentsList", action.data.data).set("total", action.data.total || state.get("total"));
    default:
      return state;
  }
}

export {
  reducer
}