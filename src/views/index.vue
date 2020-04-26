<template>
  <div id="index" :class="{adminCssStyle: $route.path.includes('detail')}">
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
    document.onclick = (e) => {
      if(e.target.className=='meun iconfont icon-caidan') {
        this.$store.commit('updateShow',true)
      }else if(
        e.target.className=='MeunTab' || 
        e.target.tagName.toLowerCase()=='img' || 
        e.target.className=='ivu-list-item' || 
        e.target.className == 'profile'
        ) {
        return
      } else {
        this.$store.commit('updateShow',false)
      }
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
  }
  .adminCssStyle {
    background: #333!important;
  }
</style>
