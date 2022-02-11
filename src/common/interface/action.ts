import type { Action } from "redux"

export interface ActionExtenal extends Action {
  data?: any
}