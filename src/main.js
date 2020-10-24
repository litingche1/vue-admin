import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './router/authority'//路由守卫
import VueCompositionApi from '@vue/composition-api';
import {buttonPermission} from '@/utils/buttonPermission'
Vue.prototype.btnperm=buttonPermission
import './icon'
Vue.use(VueCompositionApi);
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
