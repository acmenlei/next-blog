<template>
  <div id="card">
    <Row>
      <Col class="box" :xl="15" :lg="14" :md="14" :sm="24" :xs="24">
      <Music class="music"/>
        <!-- 文章卡片 -->
          <Card-item 
          @changevisited="changevisite"
          @changelike="changeliked" v-for="(item, index) in lists"
        :title="item.title" :time ="item.time"
        :content="item.content" :lable="item.lable" 
        :visited="item.visited" :like="item.like_Star"
        :id="item.id" :article_id="item.article_id"
        :accessPulish_count="item.accessPulish_count"
        :key="index"
        ></Card-item>
         <Page ref="page" 
         :total="count" 
         :page-size="3" 
         class="page" 
         @on-change="Pagechange"  
         show-total />
      </Col>
      <Col :xl="9" :lg="10" :md="10" :sm="0" :xs="0">
           <!-- 每日音乐 -->
          <Music class="xl_music"/>
          <List style="background: rgb(59, 59, 59);padding:1rem">
              <ListItem style="color:orange;font-weight:bold;">
                最近文章
              </ListItem>
            <ListItem 
              class="article_Item"
              @click.native="timeArticle(item.article_id)"
              v-for="(item, index) in navList" 
              :key="index">
              {{item.title}}
            </ListItem>
              <ListItem style="color:yellow;font-weight:bold;">
                ---------不用管我我只是一个表情包😉---------
              </ListItem>
          </List>
          <!-- 个人介绍 -->
            <h4>小主您的个人信息:</h4>
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
                <!-- <a>退出登录</!-->
                <Button style="font-size:0.5rem;margin:0 0 1.5rem 0.5rem;" type="default" @click="modal1 = true">退出登录</Button>
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
                <p>温馨提示:小主如果点错了,连续按两次编辑信息可以取消编辑哦(。・∀・)ノ</p>
            </div>
          </div>
          <!-- 个人介绍结束 -->
          <h4>博主的交友信息:</h4>
          <Tabs class="tabs" value="name1"> 
        <TabPane label="联系方式" name="name1">
          <i class="iconfont icon-qq" style="color:skyblue;"></i>:755425595 
          <i class="iconfont icon-weixin" style="color:green;"></i>:x972761675
          <br>
          🙆‍♂️ 有问题欢迎小伙伴来学习讨论~
          <br>
          博客文章内容主要就是我在开发中遇到的一些常见的问题，记录下来让自己有个印象，应该也可以帮到你们，欢迎你们的光临，多多支持，over~
        </TabPane>
        <TabPane label="打游戏call我" name="name3">
          ps: 博主也是很热爱游戏的哈,欢迎小伙伴骚扰 \(￣︶￣*\)) 。。
          <br>
          <i class="iconfont icon--" style="color:yellow"></i>
          王者荣耀 ：vx, qq我都有,你喜欢怎么躺？
          <br>
          小伙伴们有什么好玩的游戏可以留言安利一下啦😁~
          <br>
          over!
        </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>
<script>
import { getnotedetail ,PostMessage,PageSizeChange } from '../NetWork/request'
import CardItem from './CardIItem'
import Music from './Music'
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
    components: {CardItem,Music},
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
        Pagechange(index) {
        PageSizeChange('/page/getnotePage',{page:index})
        .then(res => {
          if(res.data.err == 0) {
            this.count = res.data.message.count
            this.lists = res.data.message.data
          } else {
            this.$Message.error("网络出错了,(ノへ￣、)！")
          }
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
      .music {
        display: none;
      }
      .xl_music {
        margin-top: 2rem;
        border-top-left-radius: 0.3rem;
      }
      @media screen and(max-width:768px) {
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
        color: #957ee6;
        cursor: pointer;
        transition: all 1s;
      }
      .box {
        margin-top: 1.5rem;
         .page {
              padding-left: 1rem;
      }
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
            position:absolute;color:lightblue;
            top:13rem;left:50%;
            transform: translate(-50%,-50%);
            opacity: .6;
          }
        .tabs {
          background: rgb(59, 59, 59);
          margin-top:1rem;
          border-radius: .4rem;
          padding: 1rem;
          color: lightblue;
        }
        .myInfo {
          width: 100%;height: 28rem;
          margin-top: 1rem;
          border-top-left-radius: 0.3rem;
          border-bottom-left-radius: 0.3rem;
          background: rgb(59, 59, 59);
          padding: 1rem;
          .SuccessInfo {
            img {
              width: 5rem;
              height: 5rem;
              border-radius: 50%;
              box-shadow: 0 0 5px #ccc;
              margin: 1rem 0 0 1rem;
            }
            p{
              text-align: left;
              font-size: .9rem;
              margin-left: 1rem;
              color: rgb(173, 173, 173);
              font-weight: bold;
              span {
                color: #ee932b;
                font-weight: bold;
              }
            }
            .name,
            .info {
              border: 0;
              outline: none;
              padding: 0.2rem;
              color: rgb(247, 96, 154)!important;
              transition: all .5s;
              font-weight: bold;
              border-radius: 0.8rem;
            }
            .info {
              width: 80%;
            }
            .active {
              background: transparent;
            }
          }
        }
    }
</style>