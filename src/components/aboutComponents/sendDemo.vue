<template>
  <div class="sendDemo">
    <div class="demoItem">
      <video v-show="video_path" id="video" controls="" preload="none" :poster="video_pic">
      <source :src="video_path" type="video/mp4">
      </video>
       <Upload action="http://39.107.50.117:3000/upload/sendcontent"
               :on-success="handlePSuccess">
        <Button icon="ios-cloud-upload-outline">选择封面文件</Button>
        </Upload>
      <Upload action="http://39.107.50.117:3000/upload/sendcontent"
               :on-success="handleVSuccess">
        <Button icon="ios-cloud-upload-outline">选择录屏文件</Button>
        </Upload>
        <p>{{code_path}}</p>
        <Upload action="http://39.107.50.117:3000/upload/sendcontent"
               :on-success="handleCSuccess">
        <Button icon="ios-cloud-upload-outline">选择源码文件</Button>
        </Upload>
            <Input v-model="content" 
            maxlength="100" 
            show-word-limit type="textarea" 
            placeholder="Enter something..." 
            style="width: 100%;display:block;margin:1rem 0" />
        <Button @click.native="sendVideo" type="primary">发表</Button>
    </div>
  </div>
</template>

<script>
import { PostMessage } from '../NetWork/request'
  export default {
    name:'senddemo',
    data () {
      return {
          video_pic:'',
          video_path:'',
          code_path:'',
          content:''
      };
    },
    methods: {
        handleVSuccess(res) {
             this.video_path = res.url
        },
        handlePSuccess(res) {
            this.video_pic = res.url
        },
        handleCSuccess(res) {
            this.code_path = res.url
        },
        sendVideo() {
            if(this.video_path && this.video_pic && this.code_path && this.content) {
            PostMessage('/upload/uploadDemo',{
                content:this.content, 
                videoPIC: this.video_pic, 
                videoPath: this.video_path, 
                codePath: this.code_path
            }
            )
            .then(res => {
            if(res.data.err === 0) {
              this.$Message.success(res.data.data);
              setTimeout(() => {
                this.$router.replace('/about');
              }, 1500);
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
 .sendDemo {
     width: 90%;
     margin: 0 auto;
     .demoItem {
         width: 30%;
         margin: 1rem;
         padding: 0.8rem;
         height: 20rem;
         background: #f2f2f2;
         border-radius: 0.5rem;
         position: relative;
         z-index: 9;
         #video {
             border-radius: 0.5rem;
             width: 100%;
             height: 65%;
             outline: none;
         }
     }
     @media screen and(max-width: 955px){
        .demoItem {
         width: 45%;
         height: 18rem;
     }
     }
      @media screen and(max-width: 595px){
        .demoItem {
         width: 100%;
         height: 25rem;
     }
     }
 }
</style>