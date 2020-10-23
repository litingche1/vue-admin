import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
Vue.use(VueRouter)
export const defaultRouterMap=[
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
    component: Layout,
    meta:{
      name:'控制台',
      icon:'home'
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
]
//0: {name: "业务员", role: "sale"}
// 1: {name: "技术员", role: "technician"}
// 2: {name: "部门经理", role: "manager"}
export const asyncRouterMap=[
  //信息管理
  {
    path: '/Infor',
    name: 'Infor',
    component: Layout,
    meta:{
      name:'信息管理',
      system:'信息功能',
      role:['技术员'],
      icon:'infor'
    },
    children: [
      {
        path: '/inforCategory',
        name: 'inforCategory',
        component: () => import('../views/Infor/inforCategory.vue'),
        meta:{
          name:'信息分类',
          role:['技术员'],
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
      {
        path: '/details',
        name: 'details',
        hidden:true,
        component: () => import('../views/Infor/details.vue'),
        meta:{
          name:'信息列表详情',

        }
      },
    ]
  },
  //用户管理
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta:{
      name:'用户管理',
      system:'用户功能',
      icon:'user'
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
console.log(asyncRouterMap)
const routes = defaultRouterMap

const router = new VueRouter({
  routes
})

export default router
