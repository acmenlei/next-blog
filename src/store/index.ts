import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { combineReducers } from "redux-immutable"

import { reducer as home } from "./modules/home"
import { reducer as article } from "./modules/article"
import { reducer as login } from "./modules/login"
import { reducer as board } from "./modules/board"

const store = createStore(combineReducers({
  home,
  article,
  login,
  board
}), applyMiddleware(thunk))

export default store