import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// 分类路由组件
import CategoriesEdit from '../views/CategoriesEdit.vue'
import CategorieList from '../views/CategorieList.vue'
// 物品组件
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
// 英雄组件
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
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
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
