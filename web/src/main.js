import Vue from 'vue'
import App from './App.vue'
// 引入字体图标库
import '../src/assets/iconfont/iconfont.css'
import '../src/assets/css/style.scss'
import router from './router'
Vue.config.productionTip = false

// 轮播图组件
import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper,/*{ default global options} */)

// 卡片组件
import Card from './components/Card.vue'
Vue.component('m-card',Card)
import CardList from './components/CardList.vue'
Vue.component('m-list-card',CardList)
import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000/web/api'
axios.defaults.baseURL = process.env.VUE_APP_API_URL || '/web/api'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
