import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'

Vue.config.productionTip = false
Vue.mixin(mixin)
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
