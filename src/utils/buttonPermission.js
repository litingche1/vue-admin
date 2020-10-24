import store from '../store/index'
export function  buttonPermission(params){
    // store.getters['login/role']
    // console.log(store.getters['login/buttonPermission'])
    // console.log(params)
    return store.getters['login/buttonPermission'].some(item=>item.indexOf(params)!==-1)

}