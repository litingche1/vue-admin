import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapae: JSON.parse(sessionStorage.getItem('isCollapae')) || false,
  },
  mutations: {
    SET_COLLAPSE (state) {
      state.isCollapae = !state.isCollapae
      window.sessionStorage.setItem('isCollapae', JSON.stringify(state.isCollapae))
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
