<template>
  <div id="message">
    <marquee style="color:#333;" direction="left">
      可以给博主大大提点建议他回来的时候就可以看见啦  (｡･∀･)ﾉﾞ嗨 ~
      </marquee>
      <div class="compile">
         <Input v-model="value" maxlength="100" 
          show-word-limit type="textarea" 
          placeholder="你想说些什么呢..." 
          style="width: 80%;" />
          <Button 
            class="btn" 
            type="primary"
            @click="publish">发表</Button>
      </div>
        <List class="leaveContent">
          <!-- 留言 -->
          <Modal
            title="回复内容"
            v-model="isshow"
            @on-ok="handelInputContent"
            :mask-closable="false">
            <Input v-model="replyValue" type="textarea" placeholder="输入回复内容..." />
          </Modal>
            <div v-for="(item, index) in arrMesasgeList" :key="index">
              <ListItem ref="contentItem" class="contentItem">
               <p class="number_id">{{item.id}} 楼</p>
              <img :src="item.Imgsrc"> 
               <a>{{item.name}}</a>
               <span>{{item.value}}</span>
              <p>{{item.date}}</p>
              <p @click="SetReplyInfo(item, index)" class="reply">回复</p>
            </ListItem>
            <!-- 回复 -->
             <div class="replyContent" v-for="(replyitem, j) in item.replyAccess" :key="j">
                <ListItem ref="replyItem" class="replyItem">
                <p class="number_id">{{j+1}} 楼</p>
                <p class="reply_access">
                  <p class="content"><img :src="replyitem.user_imgsrc"> 回复<a> @{{replyitem.reply_name}}</a>:{{replyitem.content}}</p>
                </p>
              <p class="reply_name">{{replyitem.name}}</p>
              <p class="reply_time">{{replyitem.datetime}}</p>
              <p @click="SetPaddingReply(replyitem, item,  j)" class="reply">回复</p>
            </ListItem>
             </div>
            </div>
        </List>
        <Page class="page" :page-size="10" @on-change="Pagechange" :total="count" show-total />
  </div>
</template>

<script>
import { PostMessage,PageSizeChange } from './NetWork/request'
  export default {
    name:'leaveMessage',
    data () {
      return {
          value:'',
          arrMesasgeList:[],
          currentSize:1,
          count:0,
          isshow:false,
          replyInfo:{},
          replyValue:''
      };
    },
    mounted() {
      this.Pagechange(1)
    },
    methods: {
      Pagechange(index) {
        /* 发起请求 */
        PageSizeChange('/page/pageSize',{page:index})
        .then(res => {
          if(res.data.err == 0) {
            this.count = res.data.message.count
            this.arrMesasgeList = res.data.message.data
          } else {
            this.$Message.error("网络出错了,(ノへ￣、)！")
          }
        })
      },
        publish() {
          if(localStorage.getItem("username")) {
             /* 如果 value不为空的话  */
          if(this.value) {
            const username = localStorage.getItem('username')
            PostMessage('/message/leavemessage',{token:username,value:this.value})
            .then(res => {
              if(res.data.err == 0) {
                this.$Message.success(res.data.message)
                setTimeout(() => {
                  location.reload()
                }, 1000);
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
          /* 如果为空我们就不发起请求 给用户提示不能为空 */
          else {
            this.$Message.error("小主信息不能为空哦,(ノへ￣、)！")
          }
          } else {
           this.$Message.error("请先去登陆再来留言哦,(ノへ￣、)！")
          }
        },
        SetReplyInfo(item, index) {
          this.replyInfo.Info = item
          this.replyInfo.index = index
          this.isshow = true
        },
        SetPaddingReply(selfitem, parentItem, index) {
          const item = {}
          item.name = selfitem.name // 嵌套回复的名字
          item.username = parentItem.username // 嵌套回复的祖先名字
          item.date = parentItem.date // 祖先时间
          this.replyInfo.Info = item
          this.replyInfo.index = index
          this.isshow = true
        },
        handelInputContent() {
          const token = localStorage.getItem('username')
          if(!token) return this.$Message.error('您还没有登陆呢！')
          if(!this.replyValue) return this.$Message.error('内容不能为空呀,请输入内容！')
          this.replyInfo.replyValue = this.replyValue
          PostMessage('/message/replyInfo', { replyInfo: this.replyInfo, token: token})
          .then( res => {
            if(res.data.err === 0) {
              this.$Message.success(res.data.message)
              setTimeout(() => {
                location.reload()
              }, 1500);
            } else {
              this.$Message.success(res.data.message)
            }
          })
          .catch(reason => {
            this.$Message.error(reason.message)
          })
        }
    }
  }

</script>
<style lang="scss" scope>
#message {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top:2rem;
    .btn {
        margin:1rem;
        z-index: 5;
        position: relative;
    }
    .compile {
      margin:2rem;
      position: relative;
      z-index: 5;
    }
    .leaveContent {
      position: relative;
      z-index: 5;
      background: #f2f2f2;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .contentItem {
        padding: 2rem;
        position: relative;
        border-bottom: 1px solid #ccc;
        p,span,img,a{
          position: absolute;font-size: 0.8rem;
        }
        a{
          color: red;
          left: 4rem;
          top: 1rem;        
        }
       span {
          padding-right: 3rem;
          left: 4rem;bottom: 0.1rem;
       }
        img {
          top: 0.5rem;left: 1.5rem;
        }
        p {
          top: 0.5rem;right: 1rem;;
        }
        p.number_id{
        right:9rem;
      }
      }
       p.reply {
          cursor: pointer;
          top: 2.3rem;
          color: rgb(0, 132, 255);
        }
        p.reply:hover {
          color: blue;
        }
        .replyContent {
          border-bottom:1px solid #dfdada;
          padding-left:50px;
          font-size: 0.8rem;
          .replyItem {
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
            img {
                left: -2rem;
            }
          .reply {
            position: absolute;
            width: 2rem;
            white-space: nowrap;
            right: 0.8rem;
          }
          .reply_access {
            margin-top: 1rem;
            white-space: nowrap;
          }
          p.content {
            padding-left: 0.5rem;
            padding-right: 3rem;
            text-align: left;
          }
          p.reply_name {
            position: absolute;
            left: 2.8rem;
            font-size: 0.8rem;
            color: pink;
          }
          p.reply_time {
            position: absolute;
            left: 8rem;
            font-size: 0.8rem;
            color: #ccc;
          }
          p.number_id {
            position: absolute;
            right: 4rem;
            top: 1rem;
            color: #333;
          }
          }
        }
    }
    .page {
      margin:2rem 0;
      position: relative;
      z-index: 99;
    }
}
</style>