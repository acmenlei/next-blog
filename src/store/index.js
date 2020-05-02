import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isshow:false,
    fontColor: false,
    Color:'#333'
    },
  mutations: {
    updateShow(state,data) {
      state.isshow = data
    },
    updatefont(state, data) {
      state.fontColor = data
      data ? state.Color = '#fff': state.Color = '#333'
    }
  }
})
