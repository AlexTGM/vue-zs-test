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

    m-table(:params='table', @next='getNext', @previous='getPrevious')
        template(v-slot:head)
            table-head-selected(
                v-if='selected.length',
                @update='updateOrders(selected)',
                @delete='deleteOrders(selected)',
                @selectAll='selectAll'
            )
            table-head-static(v-else, @selectAll='selectAll')
        template(v-slot:row)
            table-row(
                v-for='item in itemsToDisplay',
                :item='item',
                :key='item.order_id',
                @select='item.selected = !item.selected'
            )
</template>

<script>
import mTextInput from 'components/text-input'

import mTable from 'components/table/table'

import tableHeadSelected from './table-head-selected'
import tableHeadStatic from './table-head-static'
import tableRow from './table-row'

import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        mTextInput,
        mTable,
        tableHeadSelected,
        tableHeadStatic,
        tableRow,
    },

    data: () => ({
        query: null,
        itemsToDisplay: [],
    }),

    async created() {
        await this.fetchData()
    },

    computed: {
        ...mapGetters(['table']),
        selected() {
            return this.itemsToDisplay
                .filter((i) => i.selected)
                .map((i) => i.order_id)
        },
    },

    methods: {
        ...mapActions([
            'fetchData', 
            'getNext', 
            'getPrevious',
            'updateOrders',
            'deleteOrders'
        ]),

        selectAll(atLeastOneSelected = false) {
            this.itemsToDisplay.forEach((i) => {
                i.selected = !atLeastOneSelected
            })
        },
    },

    watch: {
        'table.items': {
            handler(value) {
                this.itemsToDisplay = value.map((v) => ({
                    ...v,
                    selected: false,
                }))
            },
        },
    },
}
</script>