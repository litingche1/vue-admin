import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
    hidden: true,
    meta: {
      name: '首页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login/index.vue'),
    hidden: true,
    meta: {
      name: '登录'
    }
  },
  //控制台
  {
    path: '/home',
    name: 'Home',
    // redirect: 'index',
    component: () => import('../views/Layout/index.vue'),
    meta:{
     name:'控制台'
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/home/index.vue'),
        meta:{
          name:'控制台子路由'
        }
      }
    ]
  },
  //信息管理
  {
    path: '/Infor',
    name: 'Infor',
    component: () => import('../views/Layout/index.vue'),
    meta:{
     name:'信息管理'
    },
    children: [
      {
        path: '/inforCategory',
        name: 'inforCategory',
        component: () => import('../views/Infor/inforCategory.vue'),
        meta:{
          name:'信息分类'
        }
      },
      {
        path: '/inforList',
        name: 'inforList',
        component: () => import('../views/Infor/inforList.vue'),
        meta:{
          name:'信息列表'
        }
      },
    ]
  },
  //用户管理
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/Layout/index.vue'),
    meta:{
     name:'用户管理'
    },
    children: [
      {
        path: '/userList',
        name: 'UserList',
        component: () => import('../views/User/index.vue'),
        meta:{
          name:'用户列表'
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
