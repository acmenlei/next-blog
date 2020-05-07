import Vue from 'vue'
import VueRouter from 'vue-router'
import { getnotedetail } from '../components/NetWork/request'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:() => import('../views/Home.vue')
  },
  {
    path:'/message',
    name:'message',
    component:() => import('../views/LeaveMessage.vue')
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Login.vue')
  },
  {
    path:'/logined',
    name:'logined',
    component:() => import('../components/LoginComponents/Logined.vue')
  },
  {
    path:'/photos',
    name:'photos',
    component:() => import('../views/Photos.vue')
  },
  {
    path:'/profile',
    name:'profile',
    component:() => import('../views/Profile.vue')
  },
  {
    path:'/category',
    name:'category',
    component:() => import('../views/category.vue')
  },
  {
    path:'/article',
    name:'card',
    component:() => import('../components/HomeComponents/Card.vue')
  },
  {
    path:'/demo',
    name:'demo',
    component:() => import('../views/Demo.vue')
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:() => import ('../components/HomeComponents/detail')
  },
  {
    path:'/admin/login',
    name:'adminlogin',
    component:() => import ('../admin/adminLogin.vue')
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
        name:'uploadphoto',
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

/* 重定向不报错 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
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
/* 管理系统守卫 */
router.beforeEach((to,from,next) => {
  if(to.path.includes("/admin/article")) {
    getnotedetail('/user/adminIslogined').then(res => {
      if(res.data.err === 0) {
        next()
      } else {
        router.push({ name: 'adminlogin'})
      }
    })
  }
  next()
})
// 以登陆状态
router.beforeEach((to, from, next) => {
  if(to.path.includes("/admin/login")) {
    getnotedetail('/user/adminIslogined').then(res => {
      if(res.data.err === 0) {
        router.push({name:'admin'})
      } else {
        router.push({ name: 'adminlogin'})
      }
    })
  }
  next()
})
export default router
