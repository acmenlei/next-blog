import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:() => import('../components/Home.vue')
  },
  {
    path:'/message',
    name:'message',
    component:() => import('../components/LeaveMessage.vue')
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../components/Login.vue')
  },
  {
    path:'/logined',
    name:'logined',
    component:() => import('../components/LoginComponents/Logined.vue')
  },
  {
    path:'/about',
    name:'about',
    component:() => import('../components/About.vue')
  },
  {
    path:'/profile',
    name:'profile',
    component:() => import('../components/Profile.vue')
  },
  {
    path:'/category',
    name:'category',
    component:() => import('../components/category.vue')
  },
  {
    path:'/article',
    name:'card',
    component:() => import('../components/HomeComponents/Card.vue')
  },
  {
    path:'/demo',
    name:'demo',
    component:() => import('../components/Demo.vue')
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:() => import ('../components/HomeComponents/detail')
  },
  {
    path:'/admin/article',
    name:'admin',
    component:() => import ('../admin/articleEditor.vue'),
    children:[
      {
        path:'/admin/article/upload/demo',
        name:'sendDemo',
        component:() => import('../admin/sendDemo.vue')
      },
      {
        path:'/admin/article/upload/photos',
        name:'photos',
        component:() => import ('../admin/sendcontent.vue')
      },
      {
        path:'/admin/article/upload/images',
        name:'images',
        component:() => import ('../admin/ImageUpload.vue')
      },
      {
        path:'/admin/article/upload/articlePublish',
        name:'articlePublish',
        component:() => import ('../admin/articlePublish.vue')
      },
      {
        path:'/admin/article/upload/articleManage',
        name:'articleManage',
        component:() => import ('../admin/articleManage.vue')
      },
      {
        path:'/admin/article/upload/users',
        name:'UserManage',
        component:() => import ('../admin/UserManage.vue')
      },
      {
        path:'/admin/article/upload/articleupdate/:id',
        name:'articleupdate',
        component:() => import ('../admin/updateArticle.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* 防止路由重复报错 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 全局导航守卫 */
router.beforeEach((to,from,next) => {
  if(to.path=="/login") {
      if(localStorage.getItem('username')) {
        router.replace({name:'logined'})
      }
  }
  next()
})
export default router
