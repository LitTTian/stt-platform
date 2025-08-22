import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import About from '../views/About.vue'  // 假设你有 About 页面

// 定义路由数组，类型为 RouteRecordRaw[]
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router