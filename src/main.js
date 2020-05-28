import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import './assets/iconfont/iconfont.css'
import './assets/iconfont2/iconfont.css'
import './assets/iconfont3/iconfont.css'
import './assets/iconfont4/iconfont.css'
import './assets/iconfont5/iconfont.css'
import  './components/HomeComponents/clicklove/clicklove'
import Vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 图片懒加载
Vue.use(Vuelazyload,{
  loading:'./assets/images/loading.png'
})
Vue.prototype.bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
