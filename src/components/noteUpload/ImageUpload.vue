<template>
  <div class="imageUpload">
      <!-- 图片上传 -->
      <p>
          <img v-show="src" :src="src" alt="笔记中的图片"/>
      </p>
    <Upload action="http://39.107.50.117:3000/upload/imageUpload"
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
    margin-top: 2rem;
    text-align: center;
    img {
        margin-top: 2rem;
         width: 80px;
         height: 80px;
    }
}
</style>