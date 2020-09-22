<template>
 <div class="myInfo">
            <div v-if="!username" style="text-align:center;padding-top:8rem;">
              糟糕，您还没有登陆检测不到信息! ~§(*￣▽￣*)§~
            </div>
            <div v-if="username"  class="SuccessInfo">
              <h4 style="color:orange;margin-bottom:1rem;">下面这些就是您的个人信息啦(●ˇ∀ˇ●)~</h4>
                <img :src="MyInfo.uploadimg" alt="这是头像啦啦啦">
              <Upload
                v-show="flag"
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                multiple
                type="drag"
                :action="baseURL"
                style="display: inline-block;width:58px;margin:0 0 2rem 1rem;">
                <!-- codelei.cn/api为你的后台地址 -->
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div><span style="font-size:.6rem">上传头像</span>
              </Upload>
                <!-- <a>退出登录</!-->
                <Button class="back_out" type="primary" @click="modal1 = true">退出登录</Button>
              <Modal
                  v-model="modal1"
                  title="退出提示"
                  @on-ok="ok"
                  @on-cancel="cancel">
                  <p>确定要退出登陆吗？(✿◕‿◕✿)</p>
              </Modal>
                <p><span>昵称:</span><input :class="{active:!flag}" :disabled="!flag" class="name" type="text" v-model="MyInfo.name"></p>
                <p><span>介绍:</span><input :class="{active:!flag}" :disabled="!flag" class="info" type="text" v-model="MyInfo.info"></input></p>
                <p>
                  <Button class="editor_Info" @click="updateInfo" type="default">编辑信息</Button>
                  <Button class="primary" v-show="flag" @click="primaryInfo" type="primary">提交</Button>
                </p>
                <p>温馨提示:如果点错了,连续按两次编辑信息可以取消编辑哦(。・∀・)ノ</p>
            </div>
          </div>
</template>

<script>
import { PostMessage } from '../components/NetWork/request'
  export default {
    name:'profile',
    props:{},
    data () {
      return {
        username:'',
        MyInfo:{},
        flag:false,
        modal1:false
      };
    },
    mounted() {
        this.getInfo()
    },
      computed: {
    baseURL() {
      return `${this.$store.state.baseURL}/upload/headPortraitUpload`;
    },
  },
    methods: {
       getInfo() {
        this.username = localStorage.getItem('username')
        if(this.username) {
           PostMessage('/user/getuserInfo',{token:this.username})
           .then(res => {
             if(res.data.err === 0) {
               this.MyInfo = res.data.Info[0]
             } else if(res.data.err === -999) {
               this.$Message.error('对不起,您的登录信息已过期请重新登陆。')
               localStorage.removeItem('username')
               setTimeout(() => {
                 location.reload()
               }, 1000);
             } else {
               this.$Message.error(res.data.message)
             }
           })
        }
      },
        handleSuccess(response) {
        this.MyInfo.uploadimg = response.url
      },
      updateInfo() {
        /* 打开我们的编辑框框 */
        this.flag = !this.flag;
      },
      primaryInfo() {
        /* 更换长度不得大于8位数 */
        if(this.MyInfo.name.length > 12) return this.$Message.error('昵称长度不得大于8位');
        PostMessage('/user/primaryInfo',
        {token:this.username,Info:this.MyInfo.info,name:this.MyInfo.name,Imgsrc:this.MyInfo.uploadimg})
        .then(res => {
          if(res.data.err == 0) {
            this.flag=false
            this.$Message.success(res.data.message)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      ok() {
        localStorage.clear()
        this.myInfo = {}
        location.reload()
      },
      cancel() {
          this.$Message.success('不想退出可以多看看噢！(●ˇ∀ˇ●)')
        return
      }
    },
  }

</script>
<style lang="scss" scoped>
.myInfo {
          width: 70%;height: 28rem;
          border-radius: 1rem;
          margin: 6rem auto ;
          position: relative;
          z-index: 5;
          .SuccessInfo {
            img {
              width: 8rem;
              height: 8rem;
              border-radius: 50%;
              box-shadow: 0 0 5px #ccc;
              margin: 1rem 0 0 1rem;
              position: relative;
              z-index: 3;
            }
            p{
              text-align: left;
              font-size: 1.2rem;
              margin:1rem;
              font-weight: bold;
              span {
                color: lightblue;
                font-weight: bold;
              }
            }
            .name,
            .info {
              border: 0;
              outline: none;
              padding: 0.2rem;
              transition: all .5s;
              font-weight: bold;
              border-radius: 0.2rem;
              margin-left: 0.2rem;
              background: #f2f2f2;
            }
            .info {
              width:80%;
            }
            .active {
              background: transparent!important;
            }
          }
          .editor_Info,
          .primary,
          .back_out {
            margin:1rem;
            position: relative;
            z-index: 3;
          }
            .back_out {
            font-size:0.5rem;margin:0 0 1.5rem 2rem;
          }
        }
</style>