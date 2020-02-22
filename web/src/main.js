import Vue from 'vue'
import App from './App.vue'
import '../src/assets/css/style.scss'
import router from './router'
Vue.config.productionTip = false

// 轮播图组件
import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper,/*{ default global options} */)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
