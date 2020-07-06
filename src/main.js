import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './style/reset.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
