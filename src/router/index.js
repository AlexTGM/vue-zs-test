import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import { routes as authRoutes } from '../modules/auth'
import { routes as tableRoutes } from '../modules/table'

Vue.use(VueRouter)

const routes = [
  ...authRoutes,
  ...tableRoutes
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
