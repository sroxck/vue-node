import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/global.css'
// 导入axios的实例,挂载到vue的原型对象上
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/admin/api'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
