<template lang="pug">
fragment
    tr
        td(@click='$emit("select")') X
        td {{ item.order_id }}
        td 
            a +
            span {{ item.items.length | plural("товар") }}
        td {{ item.create_date | date("DD.MM.yyyy") }}
        td {{ item.status }}
        td {{ item.is_paid }}
        td {{ item.is_shipped }}
        td {{ item.is_delivered }}
        td.is-lowercase.has-text-extra-small
            span.tag {{ item.marketplace_user_account.marketplace_name }}
        td {{ item.buyer }}
        td {{ item.shipping_method || "Почта России" }}
        td {{ item.currency_code | currency }}{{ item.total_price | formatNumber }}
    tr
        td(colspan=12)
            sub-table(:items="item.items")
</template>

<script>
import subTable from '../sub-table'

export default {
    components: {
        subTable
    },

    props: ['item'],
}
</script>