<template>
  <div id="tabbarLink">
    <Menu class="tabbar" mode="horizontal" width="auto">
        <MenuItem @click.native="triggerPage(item.path)" 
            :name="index"  v-for="(item, index) in LinkList" :key="index">
            <Icon :type="item.imageURL" />
            {{item.name}}
        </MenuItem>
    </Menu>
  </div>
</template>
<script>
 export default {
    name:'tablink',
    data () {
      return {
          LinkList:[{name:"首页",imageURL:"md-home",path:'/'},{name:"文章列表",imageURL:'ios-bookmarks-outline',path:'/article'},
                    {name:"Demo",imageURL:"logo-youtube",path:'/demo'},{name:"云相册",imageURL:'md-images',path:'/about'},
                    {name:"个人信息",imageURL:'md-person',path:'/profile'},{name:"留言板",imageURL:'ios-create',path:'/message'},
                    {name:"GitHub",imageURL:'logo-github',path:'https://github.com/Acmenlei'},{name:"登陆 / 注册",imageURL:"md-contact",path:'/login'}
          ]
      };
    },
    methods: {
        triggerPage(path) {
          if(path == '/login') {
            if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
          } else if(path == 'https://github.com/Acmenlei') {
            location.href = path
            return
          }
          this.$router.replace(path)
        },
    },
  }
</script>
<style lang="scss" scoped>
@font-face {
  font-family: '../../assets/font/Helvetica-Neue-UltraLight-2.ttf';
  src: url('../../assets/font/Helvetica-Neue-UltraLight-2.ttf');
}
#tabbarLink {
    .tabbar {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
    }
    .ivu-menu-item{
      color: #f2f2f2;
      font-size: .7rem;
      border-bottom: 0;
      height: 3.2rem;
      line-height: 2.2rem;
      font-family: '../../assets/font/Helvetica-Neue-UltraLight-2.ttf';
    }
    .ivu-menu-item:hover {
      color: yellow;
    }
    /* 清除导航下划线 */
    .ivu-menu-light {
   &:after {
     height: 0px !important;
   }
 }
}
</style>