import { Login } from '@/api/login'
const login = {
  state: {
    isCollapae: JSON.parse(sessionStorage.getItem('isCollapae')) || false
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapae = !state.isCollapae
      window.sessionStorage.setItem(
        'isCollapae',
        JSON.stringify(state.isCollapae)
      )
    }
  },
  getters: {},
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        Login(data)
          .then(res => {
            console.log(commit)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
export default login
