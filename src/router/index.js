import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/noAuthor',
    name: 'NoAuthor',
    component: () => import('../components/NoAuthor.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
  {
    // 所有不存在的页面返回404页面
    path: '*',
    name: 'error-404',
    component: () => import('../components/404.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
