<template>
  <div id="about">
    <header> 
      <Icon type="md-ribbon"></Icon>当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册<p>(提示: 保存图片请指定图片后缀格式,推荐设置为jpg)</p>
      </header>
    <Card class="card" v-for="(item, index) in talkdata" :key="index">
      {{item.content}}
            <p>{{item.datetime}}</p>       
       <img :src="item.imgsrc">
    </Card>
    <center>数据已经全部加载完啦...</center>
  </div>
</template>
<script>
import  { getnotedetail } from './NetWork/request'
  export default {
    name:'about',
    data() {
      return {
        talkdata:[]
      }
    },
    mounted() {
      getnotedetail('/upload/gettalk')
      .then(res => {
        if(res.data.err === 0) {
            this.talkdata = res.data.data;
        } else {
          this.$Message.error(res.data.data);
        }
      })
    },
  }
</script>
<style lang="scss" scoped>
#about {
  width: 80%;
  margin:2rem auto;
  position: relative;
  z-index: 5;
  transition: all 1s;
  .card {
    width:36vw;display:inline-block;margin: 0.8rem;
      img {
      display: block;
      width:33vw;
      height: 60vw;
      padding-right: 1rem;
    }
    p {
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: lightgreen;
    }
  }
  @media screen and(max-width: 1280px){
    .card {
      width: 30vw;
      img {
        width: 28vw;
      }
    }
  }
  @media screen and(max-width: 786px){
     .card {
      width: 35vw;
      img {
        width: 32vw;
      }
    }
  }
    @media screen and(max-width: 586px){
    .card {
      width: 80vw;
      img {
        width: 78vw;
        padding-right: 3rem;
      }
    }
  }
  header {
    padding-bottom: 2rem;
    position: relative;
    span:hover {
      color: lightblue;
    }
    p {
      text-align: center;
      position: absolute;
      right: 2.5rem;
      top: 2.5rem;
      color:orange;
    }
  }
}
</style>