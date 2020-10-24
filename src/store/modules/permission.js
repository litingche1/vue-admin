import {GetuserRole} from '@/api/login'
import {asyncRouterMap, defaultRouterMap} from '@/router/index'

function hasRouterRole(role, router) {
    if (router.meta && router.meta.role) {
        return role.some(item => router.meta.role.indexOf(item) >= 0)
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
            console.log(data, commit)
            GetuserRole().then(res => {
                resolve(res.data.data.role)
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
            //超级管理员
            if (data.includes('admin')) {
                roter = asyncRouterMap
            } else {//普通管理员
                roter = asyncRouterMap.filter(item => {
                    if (hasRouterRole(data, item)) {
                        if (item.children && item.children.length > 0) {
                            item.children = item.children.filter(items => {
                                if (hasRouterRole(data, items)) {
                                    return items
                                }
                            })
                            return item;
                        }
                        return item
                    }

                })
            }
            commit('SET_Router', roter)
            resolve()
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
