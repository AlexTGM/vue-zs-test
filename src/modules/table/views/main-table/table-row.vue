<template lang="pug">
fragment
    tr
        td
            m-checkbox(:value='item.selected', @input='$emit("select")')
        td.is-narrow.is-link {{ item.order_id }}
        td.is-narrow
            a(@click='item.showDetails = !item.showDetails')
                span {{ item.showDetails ? "-" : "+" }}
                span {{ item.items.length | plural("товар") }}
        td {{ item.create_date | date("DD.MM.yyyy") }}
        td {{ item.status || "Нет статуса" }}
        td.icon
            m-checkmark(:value='item.is_paid')
        td.icon
            m-checkmark(:value='item.is_shipped')
        td.icon
            m-checkmark(:value='item.is_delivered')
        td.icon.is-lowercase.has-text-extra-small
            span.tag {{ item.marketplace_user_account.marketplace_name }}
        td {{ item.buyer }}
        td {{ item.shipping_method || "Почта России" }}
        td.has-text-right {{ item.currency_code | currency }}{{ item.total_price | formatNumber }}
    tr(v-if='item.showDetails')
        td(colspan=12)
            sub-table(:items='item.items')
</template>

<script>
import mCheckbox from 'components/checkbox'
import mCheckmark from 'components/checkmark'

import subTable from '../sub-table'

export default {
    components: {
        mCheckbox,
        mCheckmark,
        subTable,
    },

    props: ['item'],
}
</script>