import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/global.css'
// 导入axios的实例,挂载到vue的原型对象上
import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000/admin/api'
axios.defaults.baseURL = process.env.Vue_APP_API_URL || '/admin/api'
// 请求拦截器
axios.interceptors.request.use(config=>{
  if(localStorage.token){
    config.headers.Authorization = 'Bearer '+ localStorage.token 
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(res=>{
  return res
},err => {
  if(err.response.data.message){
    Vue.prototype.$notify.error(err.response.data.message)
  }
  if(err.response.status === 401) {
    router.push('/login')
  }

  return Promise.reject(err)
})


Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
