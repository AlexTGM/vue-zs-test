import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

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
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
    if (store.getters.is_logged) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
