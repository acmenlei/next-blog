<template>
  <div class="publish">
    <div class="container">
      <h2>
        <i class="iconfont icon-wenzhang"></i> 文章内容编辑与发表
      </h2>
      <p>
        <i class="iconfont icon-lianjie"></i> 文章标题:
      </p>
      <Input v-model="articleDate.title" style="width:80%" placeholder="请输入文章标题..." />
      <p>
        <img v-show="articleDate.article_img" :src="articleDate.article_img" alt="笔记中的图片" />
      </p>
      <Upload :action="baseURL" :on-success="handleSuccess">
        <!-- codelei.cn/api为你的后台地址 -->
        <Button icon="ios-cloud-upload-outline">选择文章封面图片</Button>
      </Upload>
      <p>
        <i class="iconfont icon-lianjie"></i> 文章简介:
      </p>
      <Input
        v-model="articleDate.article_brief"
        style="width:80%"
        type="textarea"
        :rows="4"
        placeholder="请输入文章简介..."
      />
      <p>
        <i class="iconfont icon-lianjie"></i> 文章主体内容:
      </p>
      <Input
        v-model="articleDate.content"
        style="width:80%"
        type="textarea"
        :rows="16"
        placeholder="请输入文章主体内容..."
      />
      <p>
        <i class="iconfont icon-lianjie"></i> 文章标签:
      </p>
      <Input v-model="articleDate.lable" style="width:200px" placeholder="文章标签" />
      <p>
        <i class="iconfont icon-lianjie"></i> 文章分类:
      </p>
      <Input v-model="articleDate.article_categroy" style="width:200px" placeholder="文章分类" />
      <div class="event-Button">
        <Button @click.native="handelPublish" type="primary">修改</Button>
        <Button @click.native="handelCancel">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { PostMessage, getnotedetail } from "../components/NetWork/request";
export default {
  name: "articlePublish",
  created() {
    const id = this.$route.params.id;
    getnotedetail("/note/getArticleInfo/" + id).then((res) => {
      if (res.data.err == 0) {
        this.articleDate = res.data.message[0];
        this.$Message.success("文章信息提取完成!");
      } else {
        this.$Message.error(res.data.message);
      }
    });
  },
  data() {
    return {
      articleDate: {},
    };
  },
  computed: {
    baseURL() {
      return `${this.$store.state.baseURL}/api/upload/imageUpload`;
    },
  },
  methods: {
    handleSuccess(res) {
      this.articleDate.article_img = res.url;
    },
    handelPublish() {
      if (
        !this.articleDate.article_img ||
        !this.articleDate.content ||
        !this.articleDate.title ||
        !this.articleDate.article_brief ||
        !this.articleDate.lable
      )
        return this.$Message.error("请输入完整的文章信息!");
      PostMessage("/note/editorArticle", this.articleDate).then((res) => {
        if (res.data.err == 0) {
          this.$Message.success(res.data.message);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    handelCancel() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss">
.publish {
  .container {
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    img {
      width: 400px;
      height: 300px;
    }
    p {
      color: #333;
      margin: 1rem 0;
      font-weight: bold;
    }
    .event-Button {
      margin-top: 1rem;
      button {
        margin-right: 1rem;
      }
    }
  }
}
</style>