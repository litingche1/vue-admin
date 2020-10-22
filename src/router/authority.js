import router from './index';
import { getToken} from '@/utils/user'
import store from '../store/index'
//白名单
const whiteRouter = ['/login'];
//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            store.dispatch('login/loginout').then(() => {
                next()
            })
            // removeToken()
            // removeUsername()

        } else {
            // 获取用户的色
            // 动态分配路由权限
            /**
             * 1、什么时候处理动态路由
             * 2、以什么条件处理
             * roles[]
             */
        if(store.getters['permission/role'].length===0){
            store.dispatch('permission/getRole').then(res=>{

                store.dispatch('permission/GreatRouter',res)
            })
        }


            // next()
        }

    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
        /**
         * 1、直接进入index的时候，参数to被改变成了 "/index"，触发路由指向，就会跑beforeEach
         * 2、再一次 next 指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
         * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach。
         */
    }
})
