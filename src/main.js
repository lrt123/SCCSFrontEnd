// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/'
Vue.use(router)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios  //axios配置
Vue.prototype.$qs = qs;
// Vue.prototype.$url = 'http://localhost:8080/SCCS'
// 需要与后端对接时注释掉
// require('./mock')
Vue.prototype.$username;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

