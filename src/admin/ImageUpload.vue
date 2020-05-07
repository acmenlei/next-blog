<template>
  <div class="imageUpload">
      <!-- 图片上传 -->
      <h2>图片上传工具</h2>
      <p>
          <img v-show="src" :src="src" alt="笔记中的图片"/>
      </p>
    <Upload action="http://codelei.cn:3000/upload/imageUpload"
    :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">选择图片</Button>
    </Upload>
  </div>
</template>
<script>
  export default {
    name:'imageUpload',
    data () {
      return {
          src:''
      }
    },
    methods: {
        handleSuccess(res) {
            this.src = res.url
        }
    },
  }

</script>
<style lang="scss" scoped>
.imageUpload {
    position: relative;
    z-index: 5;
    padding-top: 5rem;
    img {
        margin-top: 2rem;
         width: 200px;
         height: 200px;
    }
}
</style>