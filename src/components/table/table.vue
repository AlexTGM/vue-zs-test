<template lang="pug">
div
    table.table
        thead
            slot(name='head')
        tbody
            slot(name='row')

    m-pagination(v-bind='$attrs', v-on='$listeners')
</template>

<script>
import mPagination from './pagination'

export default {
    components: { mPagination },

    props: {
        count: {
            type: Number,
            required: true,
        },
        has_next: { type: Boolean },
        has_previous: { type: Boolean },
    },
}
</script>