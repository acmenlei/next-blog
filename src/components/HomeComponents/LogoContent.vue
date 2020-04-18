<template>
  <div id="logocontent">
    <div class="logo_name">
       <i class="meun iconfont icon-caidan"></i>
       <img v-show="$route.name !== 'home'" src="../../assets/logo.png" alt="">
       <p v-show="$route.name !== 'home'">CODELEI</p>
       <i @click="$router.push('/category')" class="search iconfont icon-search"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name:'logo',
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
    @media screen and(max-width:992px) {
         .meun,
        .search {
          display: block !important;
        }
    }
    .meun,
    .search {
        position: absolute;
        font-size: 1.5rem;
        cursor: pointer;
        color: white;
        display: none;
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
    }
</style>