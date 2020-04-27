<template>
  <div id="carditem">
        <Card :contentid="id" class="card" >
           <p class="title"> <i class="iconfont icon-lianjie"></i>  {{title}}</p>
            <div class="img"><img :src="Itemimg" alt="封面"></div>
            <p v-html="content" class="content"></p>
            <p class="publictime">{{time | timeFilter}}</p>
            <p> 
             <Tooltip placement="top" content="点击跳转到详情页查看">
            <Button @click.native="Godetail(article_id,id)" class="readall" type="info">阅读全文</Button>
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
  .content {
      box-sizing: border-box;
      overflow:hidden;
      -webkit-line-clamp:3;
      text-overflow:ellipsis; 
      color: #f2f2f2;
      font-size: 0.9rem;
      margin-top: 0.2rem;
}
.likeStyle {
  color: rgb(91, 91, 243);
}
.box {
  text-align:right;
  color: #f2f2f2!important;
  margin-bottom: 1rem;
  i {
      margin: 0 0.5rem;
    }
    i:nth-child(1):hover {
      color: rgb(91, 91, 243);
    }
}
@media screen and (max-width: 568px) {
    .card {
      margin: 1rem 2rem !important;
    }
    .content {
      font-size: 1.1rem;
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
  cursor:pointer;
  margin:2rem 1rem 1rem 0;
  border: none;
  background: rgb(34, 34, 34,.6);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
    .img {
      width: 100%;
      height: 13.5rem;
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
  border-top: 2px solid yellow;
  border-left: 2px solid lightgreen;
  position: absolute;
  left: 0;top:0;
}
.card> ::after {
  content:"";
  width: 30px;
  height: 30px;
  border-top: 2px solid blue;
  border-right: 2px solid red;
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
.publictime {
  text-align:right;color:rgb(0, 255, 13)!important;
}

.readall {
  font-size:12px;
}
}

</style>