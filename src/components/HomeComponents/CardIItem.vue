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
import { getnotedetail } from '../NetWork/request'
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
      }
    },
    data () {
      return {
        flag:true,
        accessPulish_count:0
      };
    },
    computed: {
      liked() {
        return function(id) {
          return localStorage.getItem(`like${id}`) == id
        }
      },
      newcontent() {
        return marked(this.content.toString().substring(0,300)+'...')
      },
    },
    mounted() {
      this.lightEdite()
      let color1 = parseInt(Math.random()*255)
      let color2 = parseInt(Math.random()*255)
      let color3 = parseInt(Math.random()*255)
      this.$refs.lable.style.backgroundColor=`rgba(${color1},${color2},${color3})`
      getnotedetail(`/message/accessPulishCount/${this.article_id}`)
      .then(res => {
        if(res.data.err == -999) {
          this.$Message.error(res.data.data);
        } else {
          /* 获取用户评论数量 */
          this.accessPulish_count = res.data.data[0]["COUNT(article_id)"]
        }
      })
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
      }
   },
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
  color: #957ee6!important;
  font-family: "Microsoft YaHei";
}
.likeStyle {
  color: rgb(91, 91, 243);
}
.box {
  text-align:right;
  color: white!important;
  i {
  margin: 0 0.5rem;
    }
    i:nth-child(1):hover {
      color: rgb(91, 91, 243);
    }
}

.card {
  cursor:pointer;margin:0.5rem 2rem 2rem 2.5rem;
    background: rgb(59, 59, 59);border: 0;
    // border-bottom: 1px solid #f2f2f2;
}
.title{
  text-align:center;
  animation: trigger 5s infinite alternate;
  margin-bottom: .5rem;
  color: white!important;
  font-family: cursive;
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
@keyframes trigger {
  25%{color: rgb(255, 217, 0);}
  0%{color: rgb(255, 147, 6);}
  75%{color: rgb(0, 119, 255);}
  50%{color: rgb(15, 209, 64);}
  100%{color: rgb(236, 26, 236);}
}
.readall {
  font-size:12px;
}
}

</style>