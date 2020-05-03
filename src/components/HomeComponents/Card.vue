<template>
  <div id="card">
    <Row>
      <Col :xl="3" :lg="3" :md="2" :sm="1" :xs="0">
        <header>
          .
          <!-- <Icon type="md-ribbon"></Icon>当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 文章列表 -->
        </header>
      </Col>
      <Col :xl="12" :lg="13" :md="12" :sm="12" :xs="24">
        <div class="article-box">
          <div class="article-category">
            <Icon type="ios-bookmarks-outline" />文章列表
            <div class="article-num">
              共
              <span>{{count}}</span> 篇
            </div>
          </div>
          <div class="card-left">
            <!-- 文章卡片 -->
            <Card-item
              @changelike="changeliked"
              v-for="(item, index) in lists"
              :title="item.title"
              :time="item.time"
              :Itemimg="item.article_img"
              :lable="item.lable"
              :content="item.article_brief"
              :visited="item.visited"
              :like="item.like_Star"
              :id="item.id"
              :article_id="item.article_id"
              :accessPulish_count="item.accessPulish_count"
              :key="index"
            />
            <Page
              ref="page"
              :total="count"
              :page-size="4"
              class="page"
              v-show="pageShow"
              @on-change="Pagechange"
              show-total
            />
          </div>
        </div>
      </Col>
      <Col :xl="5" :lg="5" :md="8" :sm="10" :xs="0">
        <div class="right-box">
          <div class="card-right">
            <div class="categroy-lable">
              <div class="title">
                <Icon type="ios-keypad" />分类
                <span>more</span>
              </div>
              <Tag
                class="tag"
                @click.native="getlableInfo(item)"
                :color="bgColor[index]"
                v-for="(item,index) in lablesList"
                :key="index"
              >{{item}}</Tag>
            </div>
            <div class="time-article">
              <div class="title">
                <Icon type="ios-timer" />最近文章
                <span>more</span>
              </div>
              <div
                class="ItemList"
                v-for="(item, index) in navList"
                @click="timeArticle(item.article_id)"
                :key="index"
              >
                <Tooltip content="点击跳转到详情">{{item.title}}</Tooltip>
              </div>
            </div>
            <Music />
            <!-- 交友信息 -->
            <my-makefriends style="margin-right: 1rem;" />
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import { getnotedetail, PostMessage, PageSizeChange } from "../NetWork/request";
import CardItem from "./CardIItem";
import Music from "./Music";
import myMakefriends from "./MyMakefriend";
export default {
  name: "card",
  data() {
    return {
      pageShow: true,
      lists: [],
      count: 0,
      navList: [],
      MyInfo: {},
      username: "",
      flag: false,
      modal1: false,
      value: "",
      lablesList: [],
      bgColor: ["magenta", "blue", "red", "cyan", "volcano", "yellow"]
    };
  },
  components: { CardItem, myMakefriends, Music },
  mounted() {
    /* 默认请求第一页 */
    this.Pagechange(1);
    getnotedetail("/note/gettimenoteList").then(res => {
      this.navList = res.data;
    });
    // this.getInfo();
    this.getlables();
  },
  methods: {
    getlables() {
      getnotedetail("/note/getlables").then(res => {
        if (res.data.err == 0) {
          var arr = [];
          res.data.message.forEach(ele => {
            arr.push(ele.lable);
          });
          this.lablesList = new Set(arr);
        }
      });
    },
    getlableInfo(lable) {
      this.$Spin.show();
      PostMessage("/note/getlableInfo", { lable: lable }).then(res => {
        if (res.data.err == 0) {
          res.data.message.forEach(element => {
            element.content = element.content.toString().substring(0, 300);
          });
          this.lists = res.data.message;
          this.count = this.lists.length;
          this.pageShow = false;
          this.$Spin.hide();
        }
      });
    },
    timeArticle(path) {
      this.$router.push(`/detail/${path}`);
    },
    changeliked(id) {
      this.lists.forEach(element => {
        if (element.id == id) {
          element.like_Star += 1;
          PostMessage("/note/notelike", {
            likestar: element.like_Star,
            id: id
          }).then(res => {
            if (res.data.err == 0) {
              this.$Message.success(
                "你为这篇文章增加了一个star谢谢你的支持鸭！(●ˇ∀ˇ●)"
              );
            } else {
              this.$Message.error(
                "网络好像有点差劲呢！小主稍后再来咱们不急！(ノへ￣、)"
              );
            }
          });
        }
      });
    },
    getInfo() {
      this.username = localStorage.getItem("username");
      if (this.username) {
        PostMessage("/user/getuserInfo", { token: this.username }).then(res => {
          if (res.data.err == 0) {
            this.MyInfo = res.data.Info[0];
          } else if (res.data.err == -998) {
            this.$Message.error(res.data.message);
            localStorage.clear();
            setTimeout(() => {
              this.$router.push("/login");
            }, 1500);
          } else {
            this.$Message.error("出错了");
          }
        });
      }
    },
    showLoading() {
      /* 请求数据的加载 */
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "正在努力加载请稍等...")
          ]);
        }
      });
    },
    Pagechange(index) {
      this.showLoading();
      PageSizeChange("/page/getnotePage", { page: index }).then(res => {
        if (res.data.err == 0) {
          this.count = res.data.message.count;
          this.lists = res.data.message.data;
        } else {
          this.$Message.error("网络出错了,(ノへ￣、)！");
        }
        this.$Spin.hide(); // 请求完成隐藏遮罩层
      });
    },
    handleSuccess(response) {
      this.MyInfo.uploadimg = response.url;
    },
    updateInfo() {
      /* 打开我们的编辑框框 */
      this.flag = !this.flag;
    },
    primaryInfo() {
      PostMessage("/user/primaryInfo", {
        token: this.username,
        Info: this.MyInfo.info,
        name: this.MyInfo.name,
        Imgsrc: this.MyInfo.uploadimg
      }).then(res => {
        if (res.data.err == 0) {
          this.flag = false;
          this.$Message.success(res.data.message);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    ok() {
      localStorage.clear();
      this.myInfo = {};
      setTimeout(() => {
        location.reload();
      }, 1000);
      this.$Message.success("退出成功");
    },
    cancel() {
      this.$Message.success("不想退出可以多看看噢！(●ˇ∀ˇ●)");
      return;
    }
  }
};
</script>
<style lang="scss" scoped>
#card {
  .article-box {
    background: #fff;
    border-radius: 5px;
    margin: 2rem 0;
    .article-category {
      line-height: 20px;
      font-size: 0.8rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-bottom: 1.5px solid lightseagreen;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .article-num {
        text-align: right;
        display: inline;
        float: right;
        color: #333;
        span {
          color: orange;
          font-size: 20px;
        }
      }
    }
    .card-left {
      border: 1px solid #ccc;
      border-top: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .page {
        text-align: right;
        margin: 1rem;
      }
    }
  }
  @media screen and (max-width: 568px) {
    .article-box {
      margin: 2rem;
    }
  }
  .right-box {
    margin: 2rem 1rem;
    .card-right {
      .categroy-lable,
      .time-article {
        font-size: 0.8rem;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        border-radius: 5px;
        margin-bottom: 1rem;
        .title {
          line-height: 20px;
          padding: 0.5rem;
          border-bottom: 1.5px solid lightseagreen;
          span {
            display: block;
            float: right;
            color: rgb(96, 96, 248);
            font-size: 13px;
            cursor: pointer;
          }
          span:hover {
            color: orange;
          }
        }
        .tag {
          white-space: pre-wrap;
          margin: 0.4rem;
          cursor: pointer;
        }
        .tag:hover {
          opacity: 0.8;
        }
      }
      .time-article {
        .ItemList {
          padding: 0.8rem 0.5rem;
          cursor: pointer;
          color: #555;
          border-bottom: 1px solid #ccc;
          transition: background 0.6s;
        }
        .ItemList:hover {
          background: #f2f2f2;
          color: lightgreen;
        }
      }
    }
  }
}
</style>