<template>
  <div id="logocontent">
    <div class="logo_name">
      <i class="meun iconfont icon-caidan"></i>
      <img v-show="$route.name !== 'home'" src="../../assets/images/logo.jpg" alt />
      <p v-show="$route.name !== 'home'">CODELEI</p>
      <i @click="$router.push('/category')" class="search iconfont icon-search"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "logo"
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "../../assets/font/Oh-Chewy-2.ttf";
  src: url("../../assets/font/Oh-Chewy-2.ttf");
}
#logocontent {
  .logo_name {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.8rem;
    position: relative;
    user-select: none;
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      // font-weight: bold;
      color: lightgreen;
      animation: triggerColor 7s infinite alternate;
      font-family: "../../assets/font/Oh-Chewy-2.ttf";
    }
    img {
      width: 3.5rem;
      height: 3.5rem;
      margin-top: -2.2rem;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      opacity: .9;
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
    top: 0.4rem;
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