<template>
  <div id="demo">
    <div v-for="(item, index) in demoList" :key="index" class="demoItem">
      <video id="video" controls preload="none" :poster="item.video_pic">
        <source :src="item.video_path" type="video/mp4" />
      </video>
      <footer>
        <p>{{item.content}}</p>
        <span>{{item.datetime | dateFilter}}</span>
        <Button type="success" @click.native="CatCode(item.code_path)">查看源码</Button>
      </footer>
    </div>
    <Page class="page" :page-size="6" @on-change="Pagechange" />
  </div>
</template>
<script>
import { PageSizeChange } from "../components/NetWork/request";
import moment from 'moment'
export default {
  name: "demo",
  data() {
    return {
      demoList: [],
      index: 1
    };
  },
    filters:{
      dateFilter(val) {
         return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  mounted() {
    this.getPage(this.index);
  },
  methods: {
    getPage(index) {
      this.$store.commit('LoadingTitleChange', {isshow: true, title: '正在加载案例内容,请稍等...'})
      PageSizeChange("/note/getdemolist", { page: index }).then(res => {
        if (res.data.err == 0) {
          this.demoList = res.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
       this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
      });
    },
    CatCode(path) {
      window.location.href = path;
    },
    Pagechange(page) {
      this.getPage(page);
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
  .demoItem {
    width: 30%;
    margin: 1rem;
    // padding: 0.8rem;
    height: 22rem;
    background: rgb(34, 34, 34,.8);
    border-radius: 0.5rem;
    box-shadow:0 0 3px #333;
    position: relative;
    color: #f2f2f2;
    #video {
      border-radius: 0.5rem;
      position: relative;
      width: 100%;
      height: 66%;
      outline: none;
      z-index: 2;
    }
    footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.4rem;
      p {
        font-size: 12px;
      }
      button {
        position: relative;
        z-index: 5;
        flex:1;
      }
      span {
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
  @media screen and(max-width: 568px) {
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