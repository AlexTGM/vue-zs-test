import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth_failed: '',
        access: localStorage.getItem('access') || '',
        refresh: localStorage.getItem('refresh') || '',

        limit: 20,
        items: [],

        count: 0,

        next: '',
        previous: '',

        page: 0
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

        LOAD_ITEMS(state, data) {
            state.items = data.results
            state.count = data.count

            state.next = data.next?.replace('/v1', '/api/v1')
            state.previous = data.previous?.replace('/v1', '/api/v1')
        },
        UPDATE_PAGE(state, count) {
            state.page += count
        }
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
        async fetchData({ commit, state }, query) {
            try {
                let url = `zonesmart/order/?limit=${state.limit}`

                if (query) url += `&query=${query}`

                const response = await axios.get(url)

                commit('LOAD_ITEMS', response.data)
            } catch (err) {
                return console.log(err)
            }
        },
        async getNext({ commit, state }) {
            try {
                const response = await axios.get(state.next)

                commit('UPDATE_PAGE', +1)
                commit('LOAD_ITEMS', response.data)
            } catch (err) {
                return console.log(err)
            }
        },
        async getPrevious({ commit, state }) {
            try {
                const response = await axios.get(state.previous)

                commit('UPDATE_PAGE', -1)
                commit('LOAD_ITEMS', response.data)
            } catch (err) {
                return console.log(err)
            }
        }
    },
    getters: {
        items: state => state.items,
        count: state => state.count,

        from: state => state.page * state.limit,
        to: state => (state.page + 1) * state.limit < state.count
            ? (state.page + 1) * state.limit : state.count,

        has_next: state => !!state.next,
        has_previous: state => !!state.previous,

        auth_failed: state => state.auth_failed,
        access_token: state => state.access,
        refresh_token: state => state.refresh,
    }
})
