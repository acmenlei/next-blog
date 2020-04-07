<template>
  <div v-show="$route.path !== '/home'" id="Footer">
   <p class="content_box"> 
       <p> &copy; 本博客由vue express驱动</p>
       <p v-html="Text"></p>
       <p>今天也是元气满满的一天你也要加油阿!😊</p>
   </p>
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
    mounted() {
    /* 博客营业时间设置 */
    let nowTime, beginTime, targetTime;
    setInterval(() => {
        beginTime = new Date('2020-3-1 15:18').getTime() / 1000
        nowTime= new Date().getTime() / 1000
        targetTime = nowTime - beginTime;
        this.Text = "此博客已诞生" + this.secondsFormat(targetTime);
    }, 1000);
    },
    methods: {
      secondsFormat(s) {
        var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
        var hour = Math.floor((s - day * 24 * 3600) / 3600);
        var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
        var second = Math.floor(s - day * 24 * 3600 - hour * 3600 - minute * 60);
        return day + "天" + hour + "时" + minute + "分" + second + "秒";
    }
    }
  }
</script>
<style lang="scss" scoped>
#Footer {
    width: 100%;
    background: rgb(31, 27, 27);
    height: 11rem;
    margin-top: 5rem;
    text-align: center;
    p {
       color:white;
       margin: 1rem 0;
    }
    p:nth-child(1) {
      padding-top: 1rem;
    }
}
</style>