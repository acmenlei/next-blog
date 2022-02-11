import { Map } from "immutable";

import { ActionTypes } from "./constants"

// init state
const initialState = Map({
  requestLoading: false
})
// home reducer
export function reducer(state = initialState, action: any) {
  switch (action.type) {
      // loading未开启的时候才去显示loading 
      case ActionTypes.SHOW_LOADING:
      if (!state.get("requestLoading")) {
        return state.set("requestLoading", true);
      }
      return state;
      // 同理
    case ActionTypes.HIDE_LOADING:
      if (state.get("requestLoading")) {
        return state.set("requestLoading", false);
      }
      return state;
    default:
      return state;
  }
}