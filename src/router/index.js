import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
Vue.use(VueRouter)
/**
 * 1、系统分配
 * 2、角色分配
 * 3、按钮级别分配
 *
 * 工作：路由是前台配，还是后台配的问题？
 *
 * 个人建议，前端配置，这样才能达到前后端分离的工作；
 *
 * 1、后台配置路由，前端人不在的情况；没办法页面跳转；
 * 2、新的需求，前端把路由配好了，后台的人不在，没办法找到路由；
 *
 */
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
    //404
  {
    path: '/404page',
    name: '404page',
    // redirect: 'index',
    component: Layout,
    hidden:true,
    meta:{
      name:'404',
      icon:'404'
    },
    children: [
      {
        path: '/404',
        component: () => import('../views/404/404.vue'),
        meta:{
          name:'404'
        }
      }
    ]
  },
]
//按照系统来分配权限添加system，按照角色分配权限，添加role:['技术员'],
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
          keepAlive:true,
          role:['技术员'],
        }
      },
      {
        path: '/inforList',
        name: 'inforList',
        component: () => import('../views/Infor/inforList.vue'),
        meta:{
          name:'信息列表',
          keepAlive:true,
          role:['技术员'],
        }
      },
      {
        path: '/details',
        name: 'details',
        hidden:true,
        component: () => import('../views/Infor/details.vue'),
        meta:{
          name:'信息列表详情',
          keepAlive:true,
          role:['技术员'],
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
      role:['技术员'],
      icon:'user'
    },
    children: [
      {
        path: '/userList',
        name: 'UserList',
        component: () => import('../views/User/index.vue'),
        meta:{
          name:'用户列表',
          role:['技术员'],
        }
      },
    ]
  },
  {path:"*",redirect: '/404',hidden:true}
]
console.log(asyncRouterMap)
const routes = defaultRouterMap

const router = new VueRouter({
  routes
})

export default router
