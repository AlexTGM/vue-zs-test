<template lang="pug">
div
    .spinner(v-if='!itemsToDisplay.length')
        span.spinner-inner-1
        span.spinner-inner-2
        span.spinner-inner-3

    table.table
        thead
            table-head(
                :selectedLength='selected.length',
                :allSelected='allSelected',
                @update='$emit("update", selected)',
                @delete='$emit("delete", selected)',
                @selectAll='selectAll'
            )

        tbody(v-if="itemsToDisplay.length")
            table-row(
                v-for='item in itemsToDisplay',
                :item='item',
                @select='item.selected = !item.selected'
            )

    .level.m-t-30(v-if='itemsToDisplay.length')
        div
        m-pagination(
            :params='table',
            @next='$emit("next")',
            @previous='$emit("previous")'
        )
</template>

<script>
import mPagination from 'components/pagination'

import tableHead from './table-head'
import tableRow from './table-row'

export default {
    components: {
        mPagination,
        tableHead,
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
            return (
                this.itemsToDisplay.length &&
                this.itemsToDisplay.every((i) => i.selected)
            )
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