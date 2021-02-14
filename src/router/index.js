import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Table',
    component: () => import('../views/table'),
    meta: {
      requires_auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requires_auth)) {
    if (store.getters.access_token) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
