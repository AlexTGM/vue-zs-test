import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth_failed: '',
        access: localStorage.getItem('access') || '',
        refresh: localStorage.getItem('refresh') || '',
    },
    mutations: {
        AUTH_ACCESS_TOKEN(state, access) {
            localStorage.setItem('access', access)

            state.access = access
            state.auth_failed = false
        },
        AUTH_ERROR(state) {
            state.access = ''
            state.refresh = ''
            state.auth_failed = true
        },
        AUTH_REFRESH_TOKEN(state, refresh) {
            localStorage.setItem('refresh', refresh)

            state.refresh = refresh
        },
    actions: {
        authFailed({ commit }) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')

            commit('AUTH_ERROR')
        },
        async refresh({ commit, dispatch, getters }) {
            try {
                const response = await axios.post('auth/jwt/refresh/', {
                    refresh: getters.refresh_token
                })

                commit('AUTH_ACCESS_TOKEN', response.data.access)
            } catch (err) {
                dispatch('authFailed')
            }
        },
        async login({ commit, dispatch }, user) {
            try {
                const response = await axios.post('auth/jwt/create/', user)

                const { access, refresh } = response.data

                commit('AUTH_ACCESS_TOKEN', access)
                commit('AUTH_REFRESH_TOKEN', refresh)
            } catch (err) {
                dispatch('authFailed')
            }
        },
    },
    getters: {
        auth_failed: state => state.auth_failed,
        access_token: state => state.access,
        refresh_token: state => state.refresh,
    }
})
