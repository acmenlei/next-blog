<template>
  <div id="demo">
    <h4>Ps：日常小demo与源码分享</h4>
    <div v-for="(item, index) in demoList" :key="index" class="demoItem">
      <video id="video" controls preload="none" :poster="item.video_pic">
        <source :src="item.video_path" type="video/mp4" />
      </video>
      <footer>
        <p>{{item.content}}</p>
        <span>{{item.datetime}}</span>
        <Button type="success" @click.native="CatCode(item.code_path)">查看源码</Button>
      </footer>
    </div>
    <Page class="page" :page-size="6" @on-change="Pagechange" />
  </div>
</template>
<script>
import { PageSizeChange } from "./NetWork/request";
export default {
  name: "demo",
  data() {
    return {
      demoList: [],
      index: 1
    };
  },
  mounted() {
    this.getPage(this.index);
  },
  methods: {
    getPage(index) {
      this.showLoading();
      PageSizeChange("/note/getdemolist", { page: index }).then(res => {
        if (res.data.err == 0) {
          this.demoList = res.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
        this.$Spin.hide();
      });
    },
    CatCode(path) {
      window.location.href = path;
    },
    Pagechange(page) {
      this.getPage(page);
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
    }
  }
};
</script>
<style lang="scss" scoped>
#demo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 3rem 0;
  h4 {
    width: 30rem;
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    color:#f2f2f2;
    font-family: cursive;
  }
  .demoItem {
    width: 30%;
    margin: 1rem;
    padding: 0.8rem;
    height: 20rem;
    background: transparent;
    border-radius: 0.5rem;
    box-shadow:0 0 3px #333;
    position: relative;
    color: #f2f2f2;
    #video {
      border-radius: 0.5rem;
      position: relative;
      width: 100%;
      height: 70%;
      outline: none;
      z-index: 2;
    }
    footer {
      width: 100%;
      padding: 0.5rem 0;
      p {
        font-size: 1rem;
      }
      button {
        position: relative;
        z-index: 9;
        float: right;
      }
      span {
        display:inline-block;
        margin-top:0.5rem;
        color:lightgreen;
      }
    }
  }
  @media screen and(max-width: 955px) {
    .demoItem {
      width: 45%;
      height: 18rem;
    }
  }
  @media screen and(max-width: 595px) {
    .demoItem {
      width: 100%;
      height: 25rem;
    }
  }
  .page {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
}
</style>