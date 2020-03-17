<template>
  <div id="center">
    <p v-text="text" class="centernav"></p>
    <br>
    <p>ヾ(´･ω･｀)ﾉ加油鸭!</p>
  </div>
</template>
<script>
  export default {
    name:'center',
    data () {
      return {
        text:'',
        arr:["欢迎来到我的个人博客,感谢相遇!","我们都是在努力的逐梦人!","愿你们一路披荆斩棘,共勉!"]
      };
    },
    mounted() {
      var i = 0
      /* 进入博客首先初始化 */
      this.text=this.arr[i]
      this.$nextTick(() => {
        setInterval(() => {
          i++
          if(i >= this.arr.length) {
            i=0
          }
        this.text=this.arr[i]
          i++;
        },7000)
      })
    },
  }
</script>
<style lang="scss" scoped>
#center {
    color: #dbdbdb;
    .centernav {
      padding: 0.5rem 0;
      width: 15rem;
      white-space: nowrap;
      border-right: 2px solid transparent;
      animation: triggercolor 2s infinite, typing 3.5s steps(15, end) infinite alternate, blink-caret .75s step-end infinite;
      overflow: hidden;
    }
    .readMore {
      background:transparent;
      color:white;
    }
    /* 打印效果 */
    @keyframes typing {
      from { width: 0; }
      to { width: 15em; }
    }
    /* 光标闪啊闪 */
    @keyframes blink-caret {
      from, to { box-shadow: 1px 0 0 0 transparent; }
      50% { box-shadow: 1px 0 0 0; }
    }
    @keyframes triggercolor {
       0%{color: pink;}
      25%{color: rgb(148, 202, 143);}
      50%{color: rgb(156, 156, 248);}
      75%{color: rgb(252, 252, 141);}
      100%{color: rgb(184, 101, 184);}
    }
}
</style>