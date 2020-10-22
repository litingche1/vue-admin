import {GetuserRole} from '@/api/login'
import {asyncRouterMap, defaultRouterMap} from '@/router/index'

const state = {
    role: [],
    allRouter: defaultRouterMap,
    addRouter: []
}
const mutations = {
    SET_ROLE(state, value) {
        state.role = value
    },
    SET_Router(state, value) {
        state.addRouter = value
        state.allRouter = defaultRouterMap.concat(value)
    }
}
const getters = {
    role: state => state.role
}
const actions = {
    /*
    * 获取用户角色
    *
    * */
    getRole({commit}, data) {
        return new Promise((resolve) => {
            console.log(data)
            GetuserRole().then(res => {
                commit('SET_ROLE', res.data.data.role)
                // console.log(res.data.data.role)
                resolve(res.data.data.role)
                // console.log(resolve,reject)
            }).catch(err => {
                console.log(err)
            })
        })
    },
    /*
    * 创建动态路由
    *
    * */
    GreatRouter({commit}, data) {
        return new Promise((resolve) => {
            console.log(resolve, data, commit)
            const roter = asyncRouterMap.filter(item => {
                if (data.includes(item.meta.system)) {
                    return item
                }
            })
            commit('SET_Router', roter)
            // console.log(roter)
        })
    }
    // loginout({ commit }) {
    //     return new Promise(resolve => {
    //         commit('SET_TOKEN', '')
    //         commit('SET_USERNAME', '')
    //         removeToken()
    //         removeUsername()
    //         resolve()
    //     })
    // }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
