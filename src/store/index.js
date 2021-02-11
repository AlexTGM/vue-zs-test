import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        access: localStorage.getItem('access') || '',
        refresh: localStorage.getItem('refresh') || '',
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, access, refresh) {
            state.status = 'success'
            state.access = access
            state.refresh = refresh
        },
        AUTH_ERROR(state) {
            state.status = 'error'
        },
        LOGOUT(state) {
            state.status = ''
            state.access = ''
            state.refresh = ''
        },
    },
    actions: {
        clearStorage() {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        },
        async login({ commit, dispatch }, user) {
            commit('AUTH_REQUEST')

            try {
                const response = await axios.post('auth/jwt/create/', user)

                const { access, refresh } = response.data

                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)

                commit('AUTH_SUCCESS', access, refresh)

                axios.defaults.headers.common['Authorization'] = `JWT ${access}`
            } catch (err) {
                commit('AUTH_ERROR')
                dispatch('clearStorage')

                return console.log(err)
            }
        },
        logout({ commit, dispatch }) {
            commit('LOGOUT')

            dispatch('clearStorage')

            delete axios.defaults.headers.common['Authorization']
        },
        fetchData(/* { commit }, query */) {

        }
    },
    getters: {
        is_logged: state => !!state.access,
        auth_status: state => state.status,
    }
})
