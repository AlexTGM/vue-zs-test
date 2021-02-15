import axios from 'axios'

export default {
    state: () => ({
        limit: 10,
        items: [],

        count: 0,

        next: '',
        previous: '',

        page: 0
    }),
    mutations: {
        LOAD_ITEMS(state, data) {
            state.items = data.results
            state.count = data.count

            state.next = data.next?.replace('/v1', '/api/v1')
            state.previous = data.previous?.replace('/v1', '/api/v1')
        },
        RESET_DATA(state) {
            state.items = []
            state.count = 0
        },
        RESET_QUERY(state) {
            state.items = []
            state.count = 0
            state.page = 0
            state.next = ''
            state.previous = ''
        },
        UPDATE_PAGE(state, count) {
            state.page += count
        }
    },
    actions: {
        async fetchData({ commit, state }, query) {
            try {
                commit('RESET_QUERY')

                let url = `zonesmart/order/?limit=${state.limit}`

                if (query) url += `&search=${query}`

                const response = await axios.get(url)

                commit('LOAD_ITEMS', response.data)
            } catch (err) {
                return console.log(err)
            }
        },
        async getNext({ commit, state }) {
            try {
                commit('RESET_DATA')

                const response = await axios.get(state.next)

                commit('UPDATE_PAGE', +1)
                commit('LOAD_ITEMS', response.data)
            } catch (err) {
                return console.log(err)
            }
        },
        async getPrevious({ commit, state }) {
            try {
                commit('RESET_DATA')

                const response = await axios.get(state.previous)

                commit('UPDATE_PAGE', -1)
                commit('LOAD_ITEMS', response.data)
            } catch (err) {
                return console.log(err)
            }
        },
        updateOrders(_, orders) {
            console.log(`Обновляю [${orders.join(',')}]`)
        },
        deleteOrders(_, orders) {
            console.log(`Удаляю [${orders.join(',')}]`)
        }
    },
    getters: {
        table: state => ({
            items: state.items,
            count: state.count,

            from: state.page * state.limit,
            to: (state.page + 1) * state.limit < state.count
                ? (state.page + 1) * state.limit : state.count,

            has_next: !!state.next,
            has_previous: !!state.previous,
        }),
    }
}