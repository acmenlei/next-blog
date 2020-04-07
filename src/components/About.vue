<template>
  <div id="about">
      <p>
         <span style="color:orange">PS</span>:博主是一名在校生,励志成为全栈🐶，所以呀为了提升自己开始写博客，记录一下自己开发过程中遇到的问题，也同时希望能够帮助到你们，emmm非常欢迎你们来学习交流，如果有哪里的内容涉嫌抄袭，
         请留言或者联系我我马上进行删除，希望各位小伙伴来到这里能够有所收获谢谢，创作不易也需要你们的支持，谢谢！
      比个心！</p>
      <img src="../assets/images/cute.gif" alt="">
      <p>我想说的说完了over~</p>
  </div>
</template>
<script>
  export default {
    name:'about',
  }

</script>
<style lang="scss" scoped>
#about {
    margin: 10rem 5rem;
    text-align: center;
    p {
        color:#333;
    }
    img{
        width: 50%;
        margin: 2rem 5rem;
        position: relative;
                    z-index: 99;
    }
    @media screen and (min-width:768px) {
        img {
            margin: 2rem 0;
        }
    }
}
</style>