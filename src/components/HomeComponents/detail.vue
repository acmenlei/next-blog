<template>
  <div id="detail">
    <!-- 需要渲染的html -->
     <Row>
        <Col :xl="15" :lg="14" :md="14" :sm="24" :xs="24">
           <div ref="content" class="renderNav" v-html="html"></div>
         <div class="compile">
           <p style="color:#f2f2f2!important;padding:1rem 0">用户评论：</p>
         <Input v-model="value" maxlength="100" 
          show-word-limit type="textarea" 
          placeholder="你想说些什么呢..." 
          style="width: 100%;" />
          <Button 
            class="btn" 
            type="primary"
            @click="publish">发表</Button>
      </div>
        <List class="leaveContent">
            <ListItem class="contentItem" v-for="(item, index) in arrMesasgeList" :key="index">
              <img :src="item.access_img"> 
               <a>{{item.name}}</a>
               <span>{{item.access_content}}</span>
              <p>{{item.datetime}}</p>
            </ListItem>
        </List>
        </Col>
        <Col :xl="9" :lg="10" :md="10" :sm="0" :xs="0">
         <div v-show="html" class="tabbarlist">  
           <h3 style="color:white;">文章目录</h3>
           <div class="navbar" v-html="navbar">
           </div>
         </div>
        </Col>
     </Row>
  </div>
</template>
<script>
import { getnotedetail, PostMessage } from '../NetWork/request'
import highlight from 'highlight.js'
import marked from 'marked'
  export default {
    name:'detail',
    data () {
      return {
        html:'',
        navbar:'',
        value:'',
        arrMesasgeList:[]
      };
    },
    mounted() {
      this.lightEdite()
       this.$Spin.show();
      getnotedetail(`/note/bynotetext/${this.$route.params.id}`)
      .then( res => {
        this.html = marked(res.data.data.article_data[0].content)
        this.navbar = marked(res.data.data.article_data[0].navbar)
        this.arrMesasgeList = res.data.data.access_data
        this.$Spin.hide();
        })
    },
    methods: {
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
      publish() {
        const username = localStorage.getItem("username");
        if(username) {
          if(this.value !== '') {
        const article_id = this.$route.params.id
        let that = this
        const obj = {
          username:username,
          article_id:article_id,
          access_content:that.value
        }
        PostMessage('/note/accessPulish', obj)
        .then(res => {
          if(res.data.err == 0) {
            this.$Message.success("发表成功!");
            setTimeout(() => {
              location.reload()
            }, 1000);
          } else {
            this.$Message.error("发表失败检查网路后重新尝试!");
          }
        })
        } else {
          this.$Message.error("不能为空")
        }
        } else {
          this.$Message.error("请先登录哦!")
        }
      }
   },
  }
</script>
<style lang="scss" scoped>
@import url('../../assets/css/detail.css');
#detail {
    margin-top: 3.7rem;
    padding: 2rem;
  .tabbarlist {
    padding:2rem 1rem;
    margin-left: 4rem;
    box-shadow: 0 0 1rem #ccc;
    position: fixed;
  }
  .navbar {
    margin-top: 1rem;
  }
     .btn {
        margin:1rem;
    }
    .compile {
      margin:2rem;
    }
    .leaveContent {
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .contentItem {
        padding: 2rem;
        position: relative;
        border-bottom:1px solid rgb(109, 106, 106);
        p,span,img,a{
          position: absolute;font-size: 0.8rem;
        }
        a{
          color: rgb(250, 17, 17);
          left: 4rem;
          top: 1rem;
          font-size: 0.6rem;
        }
        img {
          top: 0.5rem;left: 1.5rem;
        }
        span{
          left: 8.2rem;bottom: 0.5rem;color:#fff;
          
        }
        p {
          top: 0.5rem;left: 8.2rem;
          color: #ccc!important;
        }
      }
    }
}
</style>s