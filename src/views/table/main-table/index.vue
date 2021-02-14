<template lang="pug">
div 
    table.table
        thead
            table-head-selected(
                v-if='selected.length',
                :allSelected='allSelected',
                @update='$emit("update", selected)',
                @delete='$emit("delete", selected)',
                @selectAll='selectAll'
            )
            table-head-static(
                v-else,
                :allSelected='allSelected'
                @selectAll='selectAll',
            )
        tbody
            table-row(
                v-for='(item, index) in itemsToDisplay',
                :key='index',
                :item='item',
                @select='item.selected = !item.selected'
            )

    .level
        div
        m-pagination(
            :params='table',
            @next='$emit("next")',
            @previous='$emit("previous")'
        )
</template>

<script>
import mPagination from 'components/pagination'

import tableHeadSelected from './table-head-selected'
import tableHeadStatic from './table-head-static'
import tableRow from './table-row'

export default {
    components: {
        mPagination,
        tableHeadSelected,
        tableHeadStatic,
        tableRow,
    },

    data: () => ({
        itemsToDisplay: [],
    }),

    props: ['table'],

    computed: {
        selected() {
            return this.itemsToDisplay
                .filter((i) => i.selected)
                .map((i) => i.order_id)
        },
        allSelected() {
            return this.itemsToDisplay.every((i) => i.selected)
        },
    },

    methods: {
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
                    showDetails: false,
                }))
            },
        },
    },
}
</script>