<template>
  <div id="card">
   <div class="card_content">
      <Row>
        <Col :xl="4" :lg="3" :md="2" :sm="0" :xs="0">
      <header> 
        <Icon type="md-ribbon"></Icon>当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 文章列表
      </header>
        </Col>
      <Col :xl="8" :lg="9" :md="10" :sm="12" :xs="24">
      <Music class="music"/>
        <!-- 文章卡片 -->
          <Card-item 
          @changevisited="changevisite"
          @changelike="changeliked" v-for="(item, index) in lists"
          :title="item.title" :time ="item.time"
          :Itemimg="item.article_img"
          :content="item.article_brief"
          :visited="item.visited" :like="item.like_Star"
          :id="item.id" :article_id="item.article_id"
          :accessPulish_count="item.accessPulish_count"
          :key="index"/>
         <Page ref="page" 
         :total="count" 
         :page-size="3" 
         class="page" 
         @on-change="Pagechange"  
         show-total />
      </Col>
    <Col :xl="8" :lg="9" :md="10" :sm="12" :xs="0">
           <!-- 每日音乐 -->
          <Music class="xl_music"/>
          <!-- 最近文章 -->
          <List style="padding:1rem; background: rgb(255, 255, 255,.8);margin-right:1rem;">
              <ListItem style="color:orange;font-weight:bold;">Recent articles</ListItem>
              <ListItem 
              class="article_Item"
              @click.native="timeArticle(item.article_id)"
              v-for="(item, index) in navList" 
              :key="index">
              {{item.title}}
            </ListItem>
              <ListItem style="color:green;font-weight:bold;"> ---------不用管我我只是一个表情包😉---------</ListItem>
          </List>
          <!-- 交友信息 -->
           <my-makefriends style="margin-right: 1rem;"/>
          <!-- 个人介绍 -->
        <h4 style="color:orange;margin-left:1rem;margin-top:1rem;">Your Profile:</h4>
          <div class="myInfo">
            <div v-if="!username" style="text-align:center;position:relative">
              <img class="xiaomai" width="80" height="80" src="../../assets/images/xiaomai.jpg" alt="">
              <span class="nologinShow">
                糟糕，您还没有登陆检测不到信息!快去登陆吧，
                没有账号的话在登录页点击我是新人就可以注册了,
                加入我们一起愉快的玩耍吧!
                </span>
            </div>
            <div v-if="username"  class="SuccessInfo">
                <img :src="MyInfo.uploadimg" alt="这是头像啦啦啦">
              <Upload
                v-show="flag"
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                multiple
                type="drag"
                action="http://39.107.50.117:3000/upload/headPortraitUpload"
                style="display: inline-block;width:58px;margin:0 0 2rem 1rem;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div><span style="font-size:.6rem">上传头像</span>
              </Upload>
                <!-- 退出登录 -->
                <Button style="font-size:0.5rem;margin:0 0 1.5rem 0.5rem;" type="primary" @click="modal1 = true">退出登录</Button>
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
                  <Button style="margin-right:1rem;" @click="updateInfo" type="default">编辑信息</Button>
                  <Button v-show="flag" @click="primaryInfo" type="primary">提交</Button>
                </p>
                <p>温馨提示:如果点错了,连续按两次编辑信息可以取消编辑(。・∀・)ノ</p>
            </div>
          </div>
      </Col>
    </Row>
   </div>
  </div>
</template>
<script>
import { getnotedetail ,PostMessage,PageSizeChange } from '../NetWork/request'
import CardItem from './CardIItem'
import Music from './Music'
import myMakefriends from './MyMakefriend'
  export default {
    name:'card',
    data () {
      return {
        lists:[],
        count:0,
        navList:[],
        MyInfo:{},
        username:'',
        flag:false,
        modal1:false,
        value:'',
      };
    },
    components: {CardItem,Music, myMakefriends},
    mounted() {
      /* 默认请求第一页 */
      this.Pagechange(1)
       getnotedetail('/note/gettimenoteList')
      .then(res => {
        this.navList = res.data
      })
      this.getInfo()
    },
    methods: {
      timeArticle(path) {
       this.$router.push(`/detail/${path}`)
      },
      changeliked(id) {
        this.lists.forEach(element => {
          if(element.id == id) {
            element.like_Star +=1 
            PostMessage('/note/notelike',{likestar:element.like_Star,id:id})
            .then(res => {
              if(res.data.err == 0) {
                this.$Message.success("你为这篇文章增加了一个star谢谢你的支持鸭！(●ˇ∀ˇ●)")
              }else {
                this.$Message.error("网络好像有点差劲呢！小主稍后再来咱们不急！(ノへ￣、)")
              }
            })
          }
        });
      },
      changevisite(id) {
        this.lists.forEach(element => {
          if(element.id == id) {
            element.visited +=1 
            PostMessage('/note/noteVisited',{visitedNum:element.visited,id:id})
          }
        });
      },
      getInfo() {
        this.username = localStorage.getItem('username')
        if(this.username) {
           PostMessage('/user/getuserInfo',{token:this.username})
           .then(res => {
            if(res.data.err == 0) {
               this.MyInfo = res.data.Info[0]
            } else if(res.data.err == -998) {
              this.$Message.error(res.data.message)
              localStorage.clear()
              setTimeout(() => {
                this.$router.push('/login')
              }, 1500);
            } else {
              this.$Message.error("出错了")
            }
           })
        }
      },
      showLoading() {
        /* 请求数据的加载 */
          this.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', '正在努力加载请稍等...')
                ])
            }
        });
      },
        Pagechange(index) {
        this.showLoading()
        PageSizeChange('/page/getnotePage',{page:index})
        .then(res => {
          if(res.data.err == 0) {
            this.count = res.data.message.count
            this.lists = res.data.message.data
          } else {
            this.$Message.error("网络出错了,(ノへ￣、)！")
          }
          this.$Spin.hide() // 请求完成隐藏遮罩层
        })
      },
      handleSuccess(response) {
        this.MyInfo.uploadimg = response.url
      },
      updateInfo() {
        /* 打开我们的编辑框框 */
        this.flag = !this.flag;
      },
      primaryInfo() {
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
            setTimeout(() => {
              location.reload()
            }, 1000);
            this.$Message.success("退出成功")
         },
          cancel() {
          this.$Message.success('不想退出可以多看看噢！(●ˇ∀ˇ●)')
          return
      }
      },
  }
</script>
<style lang="scss" scoped>
    #card {
        header {
          padding-bottom: 2rem;
          position: relative;
          color: #f2f2f2;
          z-index: 5;
          white-space: nowrap;
          margin: 0.5rem;
          span:hover {
            color: lightblue;
          }
        }
      .music {
        display: none;
      }
      .xl_music {
        margin-top: 2rem;
        border-top-left-radius: 0.3rem;
        position: relative;
        z-index: 5;
        background: rgb(255, 255, 255,.8);
      }
      @media screen and(max-width:575px) {
        .music {
          display: block;
          margin: 1rem 2rem;
          border-radius: 1rem;
        }
      }
      i:hover {
        color: red!important;
      }
       h3 {
         color: #e7e0e0!important;
         margin-top: 0;
       }
       h4 {
         margin: 1rem 0;
       }
      .title {
        text-align: center;
      }
      .article_Item {
        cursor: pointer;
        transition: all 1s;
        position: relative;
        z-index: 5;
        color: #333;
      }
      .page {
        padding-left: 1rem;
        position: relative;
        z-index: 10;
      }
      .article_Item:hover {
        color: orange;
        margin-left: 0.5rem;
      }
        p{
            font-size: 2rem;
            font-family: cursive;
            text-align: center;
            padding: 1rem 0;
        }
        /* 未登录时显示的样式 */
        .xiaomai {
          position:absolute;
          border-radius: 0.5rem;
            top:8rem;left:50%;
            transform: translate(-50%,-50%);
        }
         .nologinShow {
          width: 100%;
          position:absolute;
          color: #333;
          top:15rem;left:50%;
          transform: translate(-50%,-50%);
          opacity: .6;
          }
        .myInfo {
          width: 96%;height: 28rem;
          padding: 1rem;
          position: relative;
          z-index: 5;
          border-radius: .4rem;
        background: rgb(255, 255, 255,.8);
          .SuccessInfo {
            img {
              width: 5rem;
              height: 5rem;
              border-radius: 50%;
              margin: 1rem 0 0 1rem;
            }
            p{
              text-align: left;
              font-size: .9rem;
              margin-left: 1rem;
              color: yellow;
              font-weight: bold;
              font-family: cursive;
              span {
                color: #000;
              }
            }
            .name,
            .info {
              border: 0;
              outline: none;
              padding: 0.2rem;
              color: #333;
              transition: all .5s;
              border-radius: 0.2rem;
              border-bottom: 1px solid #ccc;
            }
            .info {
              width: 80%;
            }
            .active {
              color: #333;
              border-bottom: 0;
              background: transparent;
            }
          }
        }
    }
</style>