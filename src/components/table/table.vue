<template lang="pug">
div
    table.table.m-b-20
        thead
            slot(name='head')
        tbody
            slot(name='row')

    .level
        div
        m-pagination(v-bind='$props', v-on='$listeners')
</template>

<script>
import mPagination from './pagination'

export default {
    components: { mPagination },

    props: ['params']
}
</script>