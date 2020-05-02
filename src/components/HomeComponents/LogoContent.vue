<template>
  <div id="logocontent">
    <div class="logo_name">
       <i class="meun iconfont icon-caidan"></i>
       <img v-show="$route.name !== 'home'" src="../../assets/images/logo.gif" alt="">
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
        user-select: none;
        p {
          font-size: 1rem;
          margin-bottom: 2.5rem;
          font-weight: bold;
          animation: triggerColor 7s infinite alternate;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
          img {
            width: 6rem;
            height: 6rem;
            margin-top: -2.2rem;
              -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          user-select: none;
          }
    }
    @keyframes triggerColor {
        0% { color: lightblue; }
        20% { color: lightgreen; }
        40% { color: lightyellow; }
        60% { color: lightcoral; }
        80% { color: lightslategrey; }
        100% { color: lightseagreen; }
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
        top: .4rem;
        }
    .meun {
        left: 2rem;
    }
    .search {
        right: 2rem;
    }
    .meun:hover,
    .search:hover {
        color: rgb(100, 177, 240);
    }
    }
</style>