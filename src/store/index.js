import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import inforList from './modules/inforList'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    inforList
  }
})
