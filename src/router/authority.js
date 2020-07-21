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
            next()
        }

    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})