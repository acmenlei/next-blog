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
    props:{},
    data () {
      return {
          LinkList:[{name:"首页",imageURL:"md-home",path:'/'},{name:"文章列表",imageURL:'ios-bookmarks-outline',path:'/article'},
                    {name:"分类",imageURL:'md-infinite',path:'/category'},{name:"云相册",imageURL:'md-ribbon',path:'/about'},
                    {name:"留言板",imageURL:'md-mail',path:'/message'},{name:"GitHub",imageURL:'logo-github',path:'https://github.com/Acmenlei'},
                    {name:"登陆 / 注册",imageURL:'md-happy',path:'/login'}
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
            location.href=path
            return
          }
          this.$router.replace(path)
        },
    },
  }
</script>
<style lang="scss" scoped>
#tabbarLink {
    .tabbar {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
    }
    .ivu-menu-item{
      color: white;
      font-size: 1rem;
      border-bottom: 0;
      height: 4.3rem;
      line-height: 4.2rem;
    }
    .ivu-menu-item:hover {
      background: rgb(53, 50, 50,.5); 
    }
    /* 清除导航下划线 */
    .ivu-menu-light {
   &:after {
     height: 0px !important;
   }
 }
}
</style>