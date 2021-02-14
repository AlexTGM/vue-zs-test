<template lang="pug">
fragment
    tr
        td
            m-checkbox(:value='item.selected', @input='$emit("select")')
        td {{ item.order_id }}
        td 
            a(@click='item.showDetails = !item.showDetails') +
            span {{ item.items.length | plural("товар") }}
        td {{ item.create_date | date("DD.MM.yyyy") }}
        td.icon
            checkmark(:value="item.is_paid")
        td.icon
            checkmark(:value="item.is_shipped")
        td.icon
            checkmark(:value="item.is_delivered")
        td.icon.is-lowercase.has-text-extra-small
            span.tag {{ item.marketplace_user_account.marketplace_name }}
        td {{ item.buyer }}
        td {{ item.shipping_method || "Почта России" }}
        td {{ item.currency_code | currency }}{{ item.total_price | formatNumber }}
    tr(v-if='item.showDetails')
        td(colspan=12)
            sub-table(:items='item.items')
</template>

<script>
import mCheckbox from 'components/checkbox'

import checkmark from './checkmark'
import subTable from '../sub-table'

export default {
    components: {
        mCheckbox,
        subTable,
        checkmark
    },

    props: ['item'],
}
</script>