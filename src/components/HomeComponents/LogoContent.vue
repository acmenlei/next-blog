<template>
  <div id="logocontent">
    <div class="logo_name">
       <i v-if="MeunisShow" class="meun iconfont icon-caidan"></i>
      <img src="../../assets/logo.png" alt="">
      <p>CODELEI</p>
       <i v-if="MeunisShow" @click="$router.push('/category')" class="search iconfont icon-icon_xinyong_xianxing_jijin-"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name:'logo',
    data () {
      return {
          MeunisShow:false,
      };
    },
    mounted() {
            this.PageInit()
            window.addEventListener('resize',() => {
              this.PageInit()
            })
    },
    methods: {
         PageInit() {
            if(window.innerWidth<768) {
            this.MeunisShow = true
            }else {
            this.MeunisShow = false
          }
          }
    },
  }
</script>
<style lang="scss" scoped>
    #logocontent {
    .logo_name {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.8rem;
        position: relative;
        // cursor: pointer;
        p {
          font-size: 1.2rem;
          margin-top: -2rem;
          font-weight: bold;
          color: white !important;
          font-family :'Times New Roman', Times, serif;
           -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
            user-select: none;
        }
            img {
              width: 5.5rem;
              height: 7.5rem;
              margin-top: -2.5rem;
               -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
            user-select: none;
            }
    }
    .meun,
    .search {
        position: absolute;
        font-size: 1.5rem;
        cursor: pointer;
        color: white;
        }
    .meun {
        top: .5rem;
        left: 3rem;
        font-size: 2rem;
    }
    .search {
        top: 1.1rem;
        right: 3rem;
        font-weight: bold;
    }
    .meun:hover,
    .search:hover {
        color: rgb(100, 177, 240);
    }
    #Meun {
      width: 35rem;
      height: 100vh;
      background: url('../../assets/images/menu_bg.jpeg') no-repeat center;
      background-size: 100% 100%;
    }
    }
</style>