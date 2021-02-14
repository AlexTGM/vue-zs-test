<template lang="pug">
tr
    td 
        main-info(:item='item')
    td {{ item.quantity }}
    td {{ item.quantity }}
    td {{ item.currency | currency }}{{ item.price | formatNumber }}
    td {{ item.currency | currency }}{{ item.total_price | formatNumber }}
</template>

<script>
import mainInfo from './main-info'

export default {
    components: {
        mainInfo
    },

    props: ['item'],
}
</script>