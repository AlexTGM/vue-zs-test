<template lang="pug">
.subtable
    table
        thead.is-opaque
            table-head
        tbody
            table-row(
                v-for='(item, index) in items',
                :key='index',
                :item='item'
            )
</template>

<script>
import tableHead from './table-head'
import tableRow from './table-row'

export default {
    components: {
        tableRow,
        tableHead,
    },

    props: ['items'],
}
</script>

<style lang="sass" scoped>
div.subtable
    background-color: #F6F9FC
    width: 100%
    padding: 28px 20px 20px 63px

    table
        width: 100%
        background-color: #F6F9FC

        tbody
            background-color: white
</style>