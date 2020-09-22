<template>
  <div id="tabbarLink">
    <a v-for="(item, index) in LinkList" :key="index" @click="triggerPage(item.path)" ref="navigators">
      <Icon :type="item.imageURL" /> {{item.name}}
    </a>
  </div>
</template>
<script>
 export default {
    name:'tablink',
    data () {
      return {
          LinkList:[{name:"首页",imageURL:"md-home",path:'/'},{name:"文章列表",imageURL:'ios-bookmarks-outline',path:'/article'},
                    {name:"Demo",imageURL:"logo-youtube",path:'/demo'},{name:"云相册",imageURL:'md-images',path:'/photos'},
                    {name:"个人信息",imageURL:'md-person',path:'/profile'},{name:"留言板",imageURL:'ios-create',path:'/message'},
                    {name:"GitHub",imageURL:'logo-github',path:'https://github.com/Acmenlei'},{name:"登陆 / 注册",imageURL:"md-contact",path:'/login'}
          ]
      };
    },
    mounted(){
      if(localStorage.getItem('username')) {
        this.$refs.navigators[this.$refs.navigators.length-1].innerHTML
         = this.$refs.navigators[this.$refs.navigators.length-1].innerHTML.replace('登陆 / 注册', '已登录')
      }
    },
    methods: {
        triggerPage(path) {
          if(path == '/login') {
            if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
          } else if(path == 'https://github.com/Acmenlei') {
            return window.open(path)
          }
          this.$router.push(path)
        },
    },
  }
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'codeleilei';
  src: url('../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf');
}
#tabbarLink {
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  a {
    font-family: '微软雅黑';
    color: #f2f2f2;
    margin: 0 1rem;
    padding: .3rem;
    font-size: 13px;
    transition: all .5s;
  }
  a:hover {
    background: #222;
    border-radius: 5px;
    color: lightgreen;
  }
}
</style>