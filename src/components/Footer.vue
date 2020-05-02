<template>
  <div v-show="$route.path !== '/home'" id="Footer">
  <div class="myWX">
    <img src="../assets/images/wx.jpg" alt="">
    
  </div>
  <div class="friendLink">
    <p>友情链接位置...</p>
    <p>友情链接位置...</p>
    <p>友情链接位置...</p>
    <p>友情链接位置...</p>
    <p>友情链接位置...</p>
    <p>友情链接位置...</p>
  </div>
    <div class="talk">
       <p> <i class="iconfont icon-touxiang"></i>: 小站刚上线, <p>添加友链请扫描微信联系。</p>~</p>
    </div>
  </div>
</template>
<script>

  export default {
    name:'down',
    data () {
      return {
          Text:''
      };
    },
  }
</script>
<style lang="scss" scoped>
#Footer {
    background: rgb(31, 27, 27);
    height: 11rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    margin-top: 2rem;
    div { 
      border-right: 1px solid #444;
      }
      div:last-child {
        border:0;
      }
    .myWX  {
      width: 15rem;
      img {
        width: 8rem;
      }
    }
    p {
      color: #f2f2f2;
    }
    .friendLink {
      width: 15rem;
      p {
        padding-top: .3rem 0;
        cursor: pointer;
    }
    p:hover {
      color: #456;
    }
    }
    .talk {
      margin-left: 2rem;
    }
}
</style>