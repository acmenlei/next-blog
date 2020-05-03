<template>
      <div :class="{show:$store.state.isshow}" class="MeunTab">
              <div class="profile">
                <img width="100" height="100" src="../assets/images/swiper1.jpeg" alt="">
                <div class="profile">Codelei</div>
            </div>
      <List style="padding-left:1.5rem;">
            <ListItem>
              <i class="iconfont icon-qq">: 755425595,</i>
              <i class="iconfont icon-weixin">: x972761675</i>
              </ListItem>
            <ListItem>
              <i @click="$router.push('/home')" class="iconfont icon-shouyex"> 首页</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/demo')" class="iconfont icon--"> Demo</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/photos')" class="iconfont icon-biaoti"> 云相册</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/message')" class="iconfont icon-liuyan2"> 留言板</i>
            </ListItem>
          <ListItem>
          <i @click="Gogithub"><Icon style="margin-left:0" type="logo-github"/> Github</i>
          </ListItem>
            <ListItem>
              <i @click="$router.push('/article')" class="iconfont icon-wenzhang"> 文章列表</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/profile')" class="iconfont icon-touxiang"> 个人信息</i>
              </ListItem>
            <ListItem>
              <i @click="skip" class="iconfont icon-denglu"> 登陆 / 注册</i>
            </ListItem>
        </List>
     </div>
</template>
<script>

  export default {
    name:'tabcontorle',
    data () {
      return {
          flag:false
      };
    },
    methods: {
        skip() {
          if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
            this.$router.push('/login')
        },
        Gogithub() {
          location.href='https://github.com/Acmenlei'
        }
    },
  }

</script>
<style lang="scss" scoped>
    .MeunTab {
      width:23rem;
      height: 100vh;
      background: url('../assets/images/wetherSon.jpg') no-repeat center;
      background-size: cover;
      position: fixed;
      left: -35rem;
      top: 3rem;
      z-index: 998;
      border-right: 1px solid lightblue;
      transition: all .5s ease-in-out;
      .ivu-list-item {
        border-bottom: 0;
      }
      i,span{
        font-size: 1.2rem;
        font-style:normal;
        margin-left: 1rem;
        color: rgb(255, 0, 106);
      }
      @media screen and (min-width:992px) {
        i,span{
          font-size: 1rem;
          font-style:normal;
          margin-left: 1rem;
        }
  }
      i:hover{
        cursor: pointer;
        color: rgb(56, 255, 6);
      }
      .profile{
        text-align: center;
       div{
        text-align: center;
        color: white;
        font-size: 25px;
        position: relative;
         background: linear-gradient(yellow,red );
         -webkit-background-clip: text;
        -moz-background-clip: text;
        color: transparent;
    }
        img {
          width: 100px;height: 100px;
           border-radius: 50%;
           transition: all 2s;
           box-shadow: 0 0 5px #fff;
           margin: 1rem;
       }
       img:hover {
           transform: rotate(360deg);
       }
      }
    }
    .show {
      left: 0;
      animation: borderFlex .9s;
    }
    @keyframes borderFlex {
      0%{ border-top-right-radius:500px;height: 0;}
      100%{ border-top-right-radius:0;height: 100vh;}
    }
</style>