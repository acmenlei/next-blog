import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isshow:false,
    fontColor: false,
    Color:'#333',
    LoadingShow: false,
    LoadingTitle:'正在加载请稍后...',
    baseURL:'你的后台地址'
    },
  mutations: {
    updateShow(state,data) {
      state.isshow = data
    },
    updatefont(state, data) {
      state.fontColor = data
      data ? state.Color = '#fff': state.Color = '#333'
    },
    LoadingTitleChange(state, data) {
      state.LoadingTitle = data.title;
      state.LoadingShow = data.isshow;
    }
  }
})
