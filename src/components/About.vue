<template>
  <div id="about">
    <header> 
      <Icon type="md-ribbon"></Icon>当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册<p>提示: 保存图片若没有后缀请指定图片后缀格式</p>
      </header>
      <waterfall :line-gap="400" :watch="talkdata">
        <waterfall-slot
          v-for="(item, index) in talkdata"
          :width="600"
          :height="600"
          :order="index"
          :key="item.id"
        >
        <div class="card">
            <p class="content">{{item.content}}</p>
            <p class="time">{{item.datetime}}</p>       
            <img v-lazy="item.imgsrc">
          </div>
        </waterfall-slot>
      </waterfall>
    <center>数据已经全部加载完啦...</center>
  </div>
</template>
<script>
import  { getnotedetail } from './NetWork/request'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    name:'about',
    data() {
      return {
        talkdata:[]
      }
    },
    components:{ Waterfall,WaterfallSlot },
    mounted() {
      getnotedetail('/upload/gettalk')
      .then(res => {
        if(res.data.err === 0) {
            this.talkdata = res.data.data;
        } else {
          this.$Message.error(res.data.data);
        }
      })
    }
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
    position: relative;
    img {
      width: 100%;
    }
    .content,
    .time {
      position: absolute;
      top: 15px;
    }
    .content {
      left: 32px;
      color: rgb(44, 164, 233);
    }
    .time {
      color: orangered;
      right: 20px;
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