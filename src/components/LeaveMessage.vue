<template>
  <div id="message">
    <marquee style="color:white;" direction="left">
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
            <ListItem class="contentItem" v-for="(item, index) in arrMesasgeList" :key="index">
              <img :src="item.Imgsrc"> 
               <a>{{item.name}}</a>
               <span>{{item.value}}</span>
              <p>{{item.date}}</p>
            </ListItem>
        </List>
        <Page style="margin:2rem 0;" :page-size="10" @on-change="Pagechange" :total="count" show-total />
  </div>
</template>

<script>
import { PostMessage,PageSizeChange } from './NetWork/request'
  export default {
    name:'',
    props:{},
    data () {
      return {
          value:'',
          arrMesasgeList:[],
          currentSize:1,
          count:0
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
            PostMessage('/message/leavemessage',{user:username,value:this.value})
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
        }
    }
  }

</script>
<style lang="scss" scope>
#message {
  width: 100%;
  height: 100%;
    text-align: center;
    padding-top:6rem;
    .btn {
        margin:1rem;
    }
    .compile {
      margin:2rem;
    }
    .leaveContent {
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .contentItem {
        padding: 2rem;
        position: relative;
        border-bottom:1px solid rgb(109, 106, 106);
        p,span,img,a{
          position: absolute;font-size: 0.8rem;
        }
        a{
          color: rgb(250, 17, 17);
          left: 4rem;
          top: 1rem;
          font-size: 0.6rem;
        }
        img {
          top: 0.5rem;left: 1.5rem;
        }
        span{
          left: 8.2rem;bottom: 0.5rem;color:#fff;
          
        }
        p {
          top: 0.5rem;left: 8.2rem;
          color: #ccc!important;
        }
      }
    }
}
</style>