<template>
      <div :class="{show:$store.state.isshow}"
           class="MeunTab">
      <List style="padding-left:1.5rem;">
            <ListItem>
              联系方式：
              <i class="iconfont icon-qq">: 755425595,</i>
              <i class="iconfont icon-weixin">: x972761675</i>
              </ListItem>
            <ListItem>
              <i @click="skip" class="iconfont icon-denglu"> 登陆 / 注册</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/home')" class="iconfont icon-shouyex"> 首页</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/message')" class="iconfont icon-liuyan2"> 留言板</i>
            </ListItem>
            <ListItem>
              <i @click="$router.push('/about')" class="iconfont icon-guanyu"> 关于</i>
              </ListItem>
              <ListItem>
              <i @click="Gogithub"><Icon style="margin-right:0.2rem" type="logo-github"/>Github</i>
              </ListItem>
            <ListItem>
              <i @click="$router.push('/profile')" class="iconfont icon-touxiang"> 个人信息</i>
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
      width: 100%;
      background: rgb(255, 255, 255);
      position: absolute;
      top: -35rem;
      z-index: 998;
      transition: all .5s ease-in-out;
      i{
        font-size: 1.2rem;
        font-style: italic;
      }
      i:hover{
        cursor: pointer;
        color: rgb(97, 171, 241);
      }
    }
    .show {
      top: 3.8rem;
    }
</style>