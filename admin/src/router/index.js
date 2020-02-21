import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
// 分类路由组件
import CategoriesEdit from '../views/CategoriesEdit.vue'
import CategorieList from '../views/CategorieList.vue'
// 物品组件
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
// 英雄组件
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

// 文章组件
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

// 广告组件
import AddEdit from '../views/AddEdit.vue'
import AddList from '../views/AddList.vue'

// 广告组件
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoriesEdit },
      { path: '/categories/edit/:id', component: CategoriesEdit, props: true },
      { path: '/categories/list', component: CategorieList },
      
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AddEdit },
      { path: '/ads/edit/:id', component: AddEdit, props: true },
      { path: '/ads/list', component: AddList },

      
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },
    ]
  },
  { path: '/login', name:'login', component:Login}
]

const router = new VueRouter({
  routes
})
Vue.mixin({
  methods:{
    getAuth(){
      return {
        Authorization: `Bearer ${localStorage.token || ''} `
      }
    }
  }
})
// 路由守卫
router.beforeEach((to, from, next) => {
 
  if (to.path === '/login') return next()
  const token = localStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
