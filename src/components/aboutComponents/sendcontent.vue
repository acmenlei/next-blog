<template>
  <div class="send_content">
      <!-- 内容 -->
      <Input v-model="content" 
      maxlength="300" 
      show-word-limit type="textarea" 
      placeholder="Enter something..." 
      style="width: 50%" />
      <!-- 图片上传 -->
      <p>
          <img v-show="content_src" :src="content_src" alt="说说图片">
      </p>
    <Upload action="http://39.107.50.117:3000/upload/sendcontent"
    :on-success="handleSuccess"
    >
        <Button icon="ios-cloud-upload-outline">选择图片</Button>
    </Upload>
    <Button @click.native="sendTalk" type="primary">发表说说</Button>
  </div>
</template>
<script>
import { PostMessage } from  '../NetWork/request'
  export default {
    name:'sendcontent',
    data () {
      return {
          content:'',
          content_src:''
      }
    },
    created() {
      const value = prompt();
      if(value != '201314xlx..') {  alert('密码验证错误！'); location.reload() }
    },
    methods: {
        handleSuccess(res) {
            this.content_src = res.url
        },
        sendTalk() {
          if(this.content_src && this.content) {
            PostMessage('/upload/talkokSend',{contents:this.content, imgsrc: this.content_src})
            .then(res => {
            if(res.data.err === 0) {
              this.$Message.success(res.data.data);
            } else {
              this.$Message.error(res.data.data);
            }
          })
          } else {
            this.$Message.error('内容不能为空!')
          }
        }
    },
  }

</script>
<style lang="scss" scoped>
.send_content {
    position: relative;
    z-index: 5;
    margin-top: 2rem;
    text-align: center;
    button {
        margin-top: 2rem;
    }
    img {
        margin-top: 2rem;
         width: 80px;
         height: 80px;
    }
}
</style>