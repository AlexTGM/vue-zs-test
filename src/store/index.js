import Vue from 'vue'
import Vuex from 'vuex'

import { store as authStore } from '../modules/auth'
import { store as tableStore } from '../modules/table'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth: authStore,
        table: tableStore
    }
})