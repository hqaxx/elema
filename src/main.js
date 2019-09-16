import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router/router.js'
import store from './store.js'

Vue.use(VueRouter)
Vue.use(MintUI)
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
