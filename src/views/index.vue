<template>
  <div id="index">
     <Header :class="{active:$route.name != 'home' || $store.state.isshow}" class="header"/>
     <keep-alive exclude="detail,profile">
     <router-view/>
     </keep-alive>
    <Tab-contorle/>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import TabContorle  from '../components/Tabcontorle'
export default {
  name: 'index',
  components:{
    Header,TabContorle,Footer
  },
  mounted() {
    this.Kanbanmusume()
    document.onclick = (e) => {
      if(e.target.className=='meun iconfont icon-caidan') {
        this.$store.commit('updateShow',true)
      }else if(e.target.className=='MeunTab' || e.target.tagName.toLowerCase()=='img' || e.target.className=='ivu-list-item' || e.target.className == 'profile') {
        return
      } else {
        this.$store.commit('updateShow',false)
      }
    }
  },
  methods: {
    Kanbanmusume() {
      setTimeout(() => {
      window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-miku/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: '../live2dw/live2d-widget-model-miku/assets/miku.model.json' },
          display: { position: 'right', width: 150, height: 250 },
          mobile: { show: true },
          log: false
          })
    }, 1000)
    }
    }
}
</script>

<style lang="scss">
*{
  list-style: none;
}
body,html {
  width: 100%;
  height: 100%;
}
  #index {
    .header{
      width: 100%;
      height: 4.2rem;
      position: absolute;
      top: 0;
      z-index: 999;
      transition: all 0.6s;
    }
    .active,
    .current {
      position: sticky;
      background: rgba(23, 23, 24, 0.8);
    }
    @keyframes star-opacity {
    0% {
        opacity: 0
    }
    40% {
        opacity: 1
    }
    60% {
        opacity: 1
    }
    100% {
        opacity: 0
    }
}
@keyframes star-pos {
    0% {
        transform: scale(0) rotate(0) translate3d(0, 0, 0);
        -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
        -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0)
    }
    100% {
        transform: scale(1) rotate(0) translate3d(-400px, 450px, 0);
        -webkit-transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
        -moz-transform: scale(1) rotate(0) translate3d(-450px, 450px, 0)
    }
}
.index-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.index-bg .stars {
    height: 0
}
.index-bg .star {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    top: 100px;
    left: 400px;
    position: relative;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
    animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
    -webkit-box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
    box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
    opacity: 0;
    z-index: 2
}
.index-bg .star:after {
    content: '';
    display: block;
    top: 0;
    left: -10px;
    border: 0 solid #fff;
    border-width: 0 90px 2px;
    border-color: transparent transparent transparent rgba(255, 255, 255, .3);
    -webkit-transform: rotate(-45deg) translate3d(1px, 3px, 0);
    transform: rotate(-45deg) translate3d(1px, 3px, 0);
    -webkit-box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%
}
  }
</style>
