import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isshow:false
    },
  mutations: {
    updateShow(state,data) {
      state.isshow = data
    }
  },
  actions: {
  },
  modules: {
  }
})
