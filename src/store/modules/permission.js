import {GetuserRole} from '@/api/login'
import {asyncRouterMap, defaultRouterMap} from '@/router/index'
function hasRouterRole(role,router){
    if(router.meta&&router.meta.role){
        role.some(item=>router.meta.role.indexOf(item)>=0)
    }
}
const state = {
    allRouter: defaultRouterMap,
    addRouter: []
}
const mutations = {
    SET_Router(state, value) {
        state.addRouter = value
        state.allRouter = defaultRouterMap.concat(value)
        console.log(state.allRouter)
    }
}
const getters = {
    allRouter: state => state.allRouter,
    addRouter: state => state.addRouter,
}
const actions = {
    /*
    * 获取用户角色
    *
    * */
    getRole({commit}, data) {
        return new Promise((resolve) => {
            console.log(data,commit)
            GetuserRole().then(res => {
                // commit('SET_ROLE', res.data.data.role)
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
            let roter = [];
            if (data.includes('admin')) {
                roter = asyncRouterMap
            } else {
                roter = asyncRouterMap.filter(item => {
                    if(hasRouterRole(data,item)){
                        // item.children=item
                        if(item.children&&item.children.length>0){
                            item.children=item.children.filter(items=>{
                                 if(hasRouterRole(data,items)){
                                     return items
                                 }
                            })
                            return item;
                        }
                    }
                    return item
                    // if (data.includes(item.meta.system)) {
                    //     return item
                    // }
                })
            }

            commit('SET_Router', roter)
            resolve()
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
