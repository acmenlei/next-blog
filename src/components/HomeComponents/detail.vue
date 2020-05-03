<template>
  <div id="detail">
    <!-- 标题 -->
    <header class="detail_header" :style="{color: Color}">
      <h2 style="font-size:1.3rem">
        <i class="iconfont icon-lianjie"></i>
        {{title}}
      </h2>
      <!-- 时间 -->
      <h3 style="padding-top:1rem;">
        <Icon type="ios-timer" />
        {{time | dateFilter}}
      </h3>
      <!-- 标签 -->
      <div class="tags">
        <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag>
      </div>
      <!-- 绚丽小球 -->
      <div class="ball">
            <span :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
      </div>
    </header>
    <!-- 需要渲染的html -->
    <Row>
      <Col :xl="3" :lg="2" :md="2" :sm="0" :xs="0">
        <p style="padding:1rem;font-family:cursive;">.</p>
      </Col>
      <Col :xl="18" :lg="20" :md="20" :sm="24" :xs="24">
        <div class="markdown-body">
          <div ref="content" class="renderNav" v-html="html"></div>
        </div>
        <div class="detail_share">
          <span :style="{color: Color}">分享文章:</span>
          <Tooltip
            v-for="(item, index) in shareIcon"
            :key="index"
            :placement="item.direction"
            :content="item.content"
          >
            <i @click="ArticleShare(index)" :class="item.icon"></i>
          </Tooltip>
          <QrcodeVue v-show="qrcode" class="erweima" :value="detailURL" />
        </div>
        <reply-orpublish
          :messageData="arrMesasgeList"
          publishURL="/note/accessPulish"
          replyURL="/note/replyInfo"
        />
      </Col>
    </Row>
  </div>
</template>
<script>
import { getnotedetail, PostMessage } from "../NetWork/request";
import highlight from "highlight.js";
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import QrcodeVue from "qrcode.vue";
import replyOrpublish from "../ReplyOrPublish/replyOrpublish";
import moment from "moment";
export default {
  name: "detail",
  data() {
    return {
      html: "",
      share_brief: "",
      share_img: "",
      value: "",
      arrMesasgeList: [],
      title: "",
      time: "",
      bgColor: ["magenta", "blue", "red", "cyan", "volcano", "yellow"],
      shareIcon: [
        {
          content: "分享到微博",
          icon: "iconfont icon-weibo",
          direction: "top"
        },
        {
          content: "分享到微信",
          icon: "iconfont icon-weixin",
          direction: "bottom"
        },
        { content: "分享到QQ", icon: "iconfont icon-qq", direction: "top" },
        {
          content: "分享到QQ空间",
          icon: "iconfont icon-qzone",
          direction: "top"
        }
      ],
      qrcode: false,
      ballColor:['orangered', 'yellow', 'lightgreen']
    };
  },
  filters: {
    dateFilter(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  },
  components: { QrcodeVue, replyOrpublish },
  mounted() {
    this.lightEdite();
    this.$Spin.show();
    getnotedetail(`/note/bynotetext/${this.$route.params.id}`).then(res => {
      const baseURL = res.data.message;
      this.html = marked(baseURL.content[0].content);
      this.share_brief = baseURL.content[0].article_brief;
      this.share_img = baseURL.content[0].article_img;
      this.title = baseURL.content[0].title;
      this.time = baseURL.content[0].time;
      this.arrMesasgeList = baseURL.data;
      this.$Spin.hide();
    });
  },
  computed: {
    detailURL() {
      return window.location.href;
    },
    lablesList() {
      const regExep = /\w\w*/g;
      return this.title.match(regExep);
    },
    TypeChange() {
      return this.$store.state.fontColor;
    },
    Color() {
      return this.$store.state.Color;
    }
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
      });
      /* 初始化marked颜色高亮 */
      marked.setOptions({
        highlight: function(code) {
          return highlight.highlightAuto(code).value;
        }
      });
    },
    ArticleShare(i) {
      let link;
      switch (i) {
        case 0: // 微博
          link = `http://service.weibo.com/share/share.php?url=${location.href}&title=${this.title}&pic=${this.share_img}&appkey='2706825840'`;
          window.location.href = link;
          break;
        case 1:
          this.qrcode = !this.qrcode;
          break;
        case 2: // qq
          link = `http://connect.qq.com/widget/shareqq/index.html?url=${location.href}&sharesource=qzone&title=${this.title}&pics=${this.share_img}&summary=${this.share_brief}&desc=${this.share_brief}`;
          window.location.href = link;
          break;
        case 3: // qq空间
          link = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${location.href}&sharesource=qzone&title=${this.title}&pics=${this.share_img}&summary=${this.share_brief}`;
          window.location.href = link;
          break;
      }
    },
    publish() {
      const username = localStorage.getItem("username");
      if (username) {
        if (this.value !== "") {
          const article_id = this.$route.params.id;
          let that = this;
          const obj = {
            token: username,
            article_id: article_id,
            access_content: that.value
          };
          PostMessage("/note/accessPulish", obj).then(res => {
            if (res.data.err == 0) {
              this.$Message.success("发表成功!");
              setTimeout(() => {
                location.reload();
              }, 1000);
            } else {
              this.$Message.error(res.data.message);
            }
          });
        } else {
          this.$Message.error("不能为空");
        }
      } else {
        this.$Message.error("请先登录哦!");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("../../assets/css/detail.css");
#detail {
  .detail_share {
    position: relative;
    z-index: 99;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .erweima {
      position: absolute;
      top: -130px;
      background: #fff;
      padding: 0.4rem 0.4rem 0 0.4rem;
      border-radius: 0.1rem;
      border: 1px solid #ccc;
    }
    span {
      color: #333;
      margin-right: 1rem;
    }
    i {
      padding: 0.6rem 0.63rem;
      border-radius: 50%;
      font-size: 1.4rem;
      margin: 0 1rem;
      cursor: pointer;
      transition: all 0.6s;
    }
    i.icon-weibo {
      border: 1px solid rgb(255, 153, 0);
      color: rgb(255, 153, 0);
    }
    i.icon-weibo:hover {
      background: rgb(255, 153, 0);
      color: white;
    }
    i.icon-weixin {
      border: 1px solid lightgreen;
      color: lightgreen;
    }
    i.icon-weixin:hover {
      background: lightgreen;
      color: white;
    }
    i.icon-qq {
      border: 1px solid skyblue;
      color: skyblue;
    }
    i.icon-qq:hover {
      background: skyblue;
      color: white;
    }
    i.icon-qzone {
      border: 1px solid yellow;
      color: yellow;
    }
    i.icon-qzone:hover {
      background: yellow;
      color: white;
    }
  }
  .detail_header {
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
      .ball {
        margin-top: 1rem;
        span {
          display: inline-block;
          width: 12px;height: 12px;
          border-radius: 50%;
          margin: 0 0.2rem;
        }
    }
    .tags {
      margin-top: 0.5rem;
    }
  }
}
.btn {
  margin: 1rem;
}
.renderNav {
  border-top: 1.5px dashed lightgreen;
  border-left: 1.5px dashed skyblue;
  border-right: 1.5px dashed lightsalmon;
  border-bottom: 1.5px dashed pink;
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 5;
  border-radius: 5px;
}
</style>