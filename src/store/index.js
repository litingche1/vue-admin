import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapae: false,
  },
  mutations: {
    SET_COLLAPSE (state) {
      state.isCollapae = !state.isCollapae
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
