<template>
  <div id="about">
    <header :style="{color: Color}"> 
      <Icon type="md-ribbon"></Icon>当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册
      </header>
        <div id="container">
          <div class="card" v-for="(item, index) in talkdata" :key="index">
            <img v-lazy="item.imgsrc">  
            <p>{{item.content}}</p>
            <p>{{item.datetime}}</p>
          </div>
      </div>
  </div>
</template>
<script>
import  { getnotedetail } from '../components/NetWork/request'
  export default {
    name:'about',
    data() {
      return {
        talkdata:[]
      }
    },
    computed:{
      Color() {
        return this.$store.state.Color
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
  width: 90%;
  margin:2rem auto;
  position: relative;
  z-index: 5;
  transition: all 1s;
  #container {
    width: 100%;
    columns: 5;
    .card {
      width: 100%;
      background: #f2f2f2;
      overflow: hidden;
      position: relative;
      border: 1px solid #ccc;
      break-inside:avoid;
      padding: 0.6rem;
    img {
      max-width: 100%;
    }
    p:nth-child(2) {
      color:orange;
    }
    p:nth-child(3) {
      text-align: right;
      color: lightgreen;
    }
    p:nth-child(3)::before {
      content:'From--';
    }
  }
  }
  @media screen and (max-width: 1500px){
      #container {
        columns:4 ;
      }
  }
    @media screen and (max-width: 1200px){
      #container {
        columns:3 ;
      }
  }
    @media screen and (max-width: 900px){
      #container {
        columns:2 ;
      }
  }
  header {
    padding-bottom: 2rem;
    position: relative;
    span:hover {
      color: lightblue;
    }
  }
}
</style>