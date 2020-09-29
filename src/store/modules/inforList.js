const state = {
    id: '' || sessionStorage.getItem('inForItemId'),
    title: '' || sessionStorage.getItem('inForItemTitle')
}
const mutations = {
    SET_ITEMDATA(state, value) {
        console.log(value)
        for (let key in value) {
            state[key] = value[key].value
            if (value[key].session) {
                sessionStorage.setItem(value[key].name, value[key].value)
            }
        }
        console.log(state.id)
    },
}
const getters = {
    id: state => state.id
}
const actions = {

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
