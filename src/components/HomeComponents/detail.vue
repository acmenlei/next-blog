<template>
  <div id="detail">
    <!-- 需要渲染的html -->
     <Row>
        <Col :xl="15" :lg="14" :md="14" :sm="24" :xs="24">
           <div ref="content" class="renderNav" v-html="html"></div>
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
import { getnotedetail } from '../NetWork/request'
import highlight from 'highlight.js'
import marked from 'marked'
  export default {
    name:'detail',
    data () {
      return {
        html:'',
        navbar:''
      };
    },
    mounted() {
      this.lightEdite()
       this.$Spin.show();
      getnotedetail(`/note/bynotetext/${this.$route.params.id}`)
      .then( res => {
        this.html = marked(res.data[0].content)
        this.navbar = marked(res.data[0].navbar)
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
}
</style>s