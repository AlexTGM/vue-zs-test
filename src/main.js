import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './axios'
import './filters'

import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Plugin } from 'vue-fragment';

library.add(faEye, faEyeSlash)

Vue.use(Plugin);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
