<template>
  <div id="carditem">
        <Card :contentid="id" class="card" >
            <h3 class="title">{{title}}</h3>
            <p ref="lable" class="lable"># {{lable}}</p>
            <p v-html="newcontent" class="content"></p>
            <p class="publictime">{{time}}</p>
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
import marked from 'marked'
import highlight from 'highlight.js'
// import { getnotedetail } from '../NetWork/request'
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
      this.lightEdite()
      let color1 = parseInt(Math.random()*255)
      let color2 = parseInt(Math.random()*255)
      let color3 = parseInt(Math.random()*255)
      this.$refs.lable.style.backgroundColor=`rgba(${color1},${color2},${color3})`
    },
    methods: {
      Godetail(article_id,id) {
        this.$router.push(`/detail/${article_id}`)
        /* 发送请求 */
        this.$emit('changevisited',id)
      },
      lightEdite() {
        highlight.initHighlightingOnLoad();
      var rendererMD = new marked.Renderer();
        marked.setOptions({
          renderer: rendererMD,
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        })
        /* 初始化marked颜色高亮 */
        marked.setOptions({
          highlight: function (code){
          return highlight.highlightAuto(code).value
        }
        })
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
      },
      newcontent() {
        return marked(this.content.toString().substring(0,300)+'...')
      },
   }
  }

</script>
<style lang="scss" scoped>
@import url('../../assets/css/detail.css');
#carditem {
  .content {
      font-family: 'title';
      box-sizing: border-box;
      overflow:hidden;
      -webkit-line-clamp:3;
      text-overflow:ellipsis; 
      color: #333;
}
.likeStyle {
  color: rgb(91, 91, 243);
}
.box {
  text-align:right;
  color: #333!important;
  i {
      margin: 0 0.5rem;
    }
    i:nth-child(1):hover {
      color: rgb(91, 91, 243);
    }
}

.card {
  position: relative;
  cursor:pointer;margin:0.5rem 2rem 2rem 2.5rem;
    border: 0;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 2px #ccc;
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
@font-face {
  font-family: 'title';
  src: url('../../assets/font/font_title.ttf');
}
.title{
  text-align:center;
  margin-bottom: .5rem;
  color: #000!important;
  font-family: 'title';
}
.lable { 
  text-align: center;
  width: 6rem;
  padding: .2rem;
  border-radius: .2rem;
  color: white!important;
  font-size: .9rem;
}
.publictime {
  text-align:right;color:#ccc!important;
  margin:1rem 0;
}

.readall {
  font-size:12px;
}
}

</style>