<template lang="pug">
.container
    .level.m-b-30
        .level-left
            h1.title Таблица заказов

        .level-right
            .buttons
                button.button.is-small.is-secondary отправления
                button.button.is-small экспортировать

    .level.m-b-20
        button.button.is-secondary.m-r-30 фильтр
        m-text-input.is-fullwidth(
            v-model='query',
            type='text',
            placeholder='Поиск'
        )

    main-table(
        :table='table',
        @next='getNext',
        @previous='getPrevious',
        @update='updateOrders($event)',
        @delete='deleteOrders($event)'
    )
</template>

<script>
import mTextInput from 'components/text-input'

import mainTable from './main-table'

import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        mTextInput,
        mainTable,
    },

    data: () => ({
        query: null,
    }),

    async created() {
        await this.fetchData()
    },

    computed: {
        ...mapGetters(['table']),
    },

    methods: {
        ...mapActions([
            'fetchData',
            'getNext',
            'getPrevious',
            'updateOrders',
            'deleteOrders',
        ]),
    },
}
</script>