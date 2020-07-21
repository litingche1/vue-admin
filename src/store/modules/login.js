import { Login } from '@/api/login'
import { setToken, setUsername, getUsername,removeToken,removeUsername } from '@/utils/user'
const state = {
  isCollapae: JSON.parse(sessionStorage.getItem('isCollapae')) || false,
  toKen: '',
  userName: getUsername() || ''
}
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapae = !state.isCollapae
    window.sessionStorage.setItem(
      'isCollapae',
      JSON.stringify(state.isCollapae)
    )
  },
  SET_TOKEN(state, vaule) {
    state.toKen = vaule
  },
  SET_USERNAME(state, value) {
    state.userName = value
  }
}
const getters = {
  username: state => state.userName
}
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then(res => {
          let data = res.data.data
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', data.username)
          setToken(data.token)
          setUsername(data.username)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  loginout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERNAME', '')
      removeToken()
      removeUsername()
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
