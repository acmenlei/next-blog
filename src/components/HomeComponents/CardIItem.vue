<template>
  <div id="carditem">
        <Card :contentid="id" class="card" >
           <p class="title"> <i class="iconfont icon-lianjie"></i>  {{title}}</p>
            <p ref="lable" class="lable"># {{lable}}</p>
            <div class="img"><img :src="Itemimg" alt="封面"></div>
            <p v-html="content" class="content"></p>
            <p class="publictime">{{time | timeFilter}}</p>
            <p> 
             <Tooltip placement="top" content="点击跳转到详情页查看">
            <Button @click.native="Godetail(article_id,id)" class="readall" type="primary">阅读全文</Button>
            </Tooltip>
            <p class="box">
              <i @click="likeArticle(id)" 
              class="iconfont icon-dianzan"
              :class="{likeStyle:liked(id)}"
              >赞</i>
              </span><span style="margin-right:0.5rem">{{like}}</span>
              <i class="iconfont icon-pinglun"></i><span>{{accessPulish_count}}</span>
              <i class="iconfont icon-fangwen"></i><span>{{visited}}</span>
            </p>
            </p>
    </Card>
  </div>
</template>
<script>
  export default {
    name:'carditem',
    props:{
      title:{
        type:String,default:'',required:true
      },
      time:{
        type:String,default:'',required:true
      },
      content:{
        type:String,default:'',required:true
      },
      Itemimg:{
        type:String,default:'',required:true
      },
      lable:{
        type:String,default:'',required:true
      },
      visited:{
        type:Number,default:999,required:true
      },
      like:{
        type:Number,default:999,required:true
      },
      id:{
        type:Number,default:0,required:true
      },
      article_id:{
        type:String,default:'',required:true
      },
      accessPulish_count:{
        type:Number,default:0,required:true
      }
    },
    data () {
      return {
        flag:true,
      };
    },
    mounted() {
      let color1 = parseInt(Math.random()*255)
      let color2 = parseInt(Math.random()*255)
      let color3 = parseInt(Math.random()*255)
      this.$refs.lable.style.backgroundColor=`rgba(${color1},${color2},${color3})`
    },
    filters:{
      timeFilter(V) {
        return V.toString().slice(0,10)
      }
    },
    methods: {
      Godetail(article_id,id) {
        this.$router.push(`/detail/${article_id}`)
        localStorage.setItem('detailTitle', this.title)
        const newTime = this.time.toString().slice(0, 10)
        localStorage.setItem('detailTime', newTime)
        /* 发送请求 */
        this.$emit('changevisited',id)
      },
      likeArticle(id) {
        if(localStorage.getItem('username')) {
          if(localStorage.getItem(`like${id}`)) {
          this.$Message.success("你已经为这篇文章点过赞了噢~o(*￣▽￣*)o")
        } else {
          localStorage.setItem(`like${id}`,id)
          /* 发送请求 */
        this.$emit('changelike',id)
        }
        } else {
           this.$Message.error("请先去登陆再来点赞噢小主！(ノへ￣、)")
        }
      },
   },
   computed:{
      liked() {
        return function(id) {
          return localStorage.getItem(`like${id}`) == id
        }
      }
   }
  }

</script>
<style lang="scss" scoped>
@import url('../../assets/css/detail.css');
#carditem {
  @font-face {
  font-family: '../../assets/font/font_title.ttf';
  src: url('../../assets/font/font_title.ttf');
}
  .content {
      box-sizing: border-box;
      overflow:hidden;
      -webkit-line-clamp:3;
      text-overflow:ellipsis; 
      color: #f2f2f2;
}
.likeStyle {
  color: rgb(91, 91, 243);
}
.box {
  text-align:right;
  color: #f2f2f2!important;
  i {
      margin: 0 0.5rem;
    }
    i:nth-child(1):hover {
      color: rgb(91, 91, 243);
    }
}
@media screen and (max-width: 568px) {
    .card {
      margin-left: 2rem !important;
    }
}
@media screen and (max-width: 798px){
  .card {
      margin-left: 2rem !important;
    }
}
.card {
  position: relative;
  z-index: 5;
  cursor:pointer;margin:2rem 2rem 2rem 0;
    border: 0;
    background: transparent;
    box-shadow: 0 0 2px #333;
    .img {
      width: 100%;
      height: 70%;
      overflow: hidden;
      img {
       width: 100%;
       border-radius: 5px;
    }
    }
}
.card> ::before {
  content:"";
  width: 30px;
  height: 30px;
  border-top: 3px solid yellow;
  border-left: 3px solid lightgreen;
  position: absolute;
  left: 0;top:0;
}
.card> ::after {
  content:"";
  width: 30px;
  height: 30px;
  border-top: 3px solid blue;
  border-right: 3px solid red;
  position: absolute;
  right: 0;top:0;
}
.title{
  text-align:center;
  margin-bottom: .5rem;
  font-family: cursive;
  font-size: 18px;
  color: #f2f2f2;
}
@font-face {
  font-family: '../../assets/font/font_title.ttf';
  src: url('../../assets/font/font_title.ttf');
}
.lable { 
  text-align: center;
  width: 6rem;
  padding: .2rem;
  margin-bottom:0.5rem;
  border-radius: .2rem;
  color: white!important;
  font-size: .9rem;
  font-family: '../../assets/font/font_title.ttf' !important;
}
.publictime {
  text-align:right;color:rgb(0, 255, 13)!important;
}

.readall {
  font-size:12px;
}
}

</style>