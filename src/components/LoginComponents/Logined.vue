<template>
  <div id="Logined">
      <img src="../../assets/images/logined.gif" alt="你已经登陆过啦！">
      <p>你已经登陆过了，如果需要可以先去退出登录！</p>
  </div>
</template>
<script>
  export default {
    name:'logined',
    props:{},
    data () {
      return {

      };}
  }

</script>
<style lang="scss" scoped>
#Logined {
    padding-top: 10rem;
    text-align: center;
    p {
      font-weight: bold;
    }
}
</style>