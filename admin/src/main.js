import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/global.css'
// 导入axios的实例,挂载到vue的原型对象上
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/admin/api'
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
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 表示从哪个路径跳转而来
  // next 是一个函数,表示放行
  // next() 放行  next('路径')强制跳转
  if (to.path === '/login') return next()//判断要去的地址是不是登录,是就正常放行
  const token = localStorage.getItem('token')//其他地址要判断token存在不存在
  if (!token) return next('/login')//不存在就强制跳转到login登录页
  next()
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
