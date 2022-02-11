import { Map } from "immutable";

import { ActionTypes } from "./constants"

// init state
const initialState = Map({
  list: [],
})
// home reducer
export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.FETCH_ARTICLE_LIST:
      return state.set("list", action.data)
    default:
      return state;
  }
}