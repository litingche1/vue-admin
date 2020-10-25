import store from '../store/index'
import Vue from 'vue'
//自定义指令
Vue.directive('butperm', {
    bind: function (el, bingind, vnode) {
        console.log(vnode)
        if (bingind.def.buttonPermission(bingind.value)) {
            el.className = el.className + " show-btn"
        }
    },
    buttonPermission: function (val) {
        return store.getters['login/buttonPermission'].some(item => item.indexOf(val) !== -1)
    }
})