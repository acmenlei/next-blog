<template>
  <div v-show="$route.path !== '/home'" id="Footer">
  <div class="myWX">
    <img src="../assets/images/wx.jpg" alt="">
  </div>
      <div class="talk">
       <p>&copy; codelei.cn 版权所有</p>
       <p><a href="http://www.beian.miit.gov.cn">赣ICP备20005844号</a></p>
    </div>
  <div class="friendLink">
    <p style="color:#789;font-size:.9rem;">友情链接：</p>
    <p><a href="https://www.zhoyq.com/">衷于栖</a></p>
    <p><a href="javascript:;">友情链接待添加...</a></p>
    <p><a href="javascript:;">友情链接待添加...</a></p>
    <p><a href="javascript:;">友情链接待添加...</a></p>
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
    @media screen and (max-width: 568px) {
        .myWX {
          display: none;
        }
    }
    p {
      color: #f2f2f2;
    }
    .friendLink {
      width: 30%;
      display: grid;
      grid-template-columns: 2fr;
      justify-items: start;
      justify-content: center;
      p {
        margin-left: 20px;
        padding-top: .3rem 0;
        cursor: pointer;
        a {
          font-size: 1rem;
          color: #f2f2f2;
        }
        a:hover {
           color: #456;
        }
    }
    }
    .talk {
      font-size: 1rem;
      padding: 2.5rem 1.5rem;
      line-height: 25px;
      white-space:nowrap;
      width: 70%;
      p {
        a {
          color: white;
        }
      }
    }
}
</style>