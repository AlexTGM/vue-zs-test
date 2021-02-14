<template lang="pug">
tr
    td(@click="$emit('select')") X
    td {{ item.order_id }}
    td {{ item.items.length | plural("товар") }}
    td {{ item.create_date | date("DD.MM.yyyy") }}
    td {{ item.status }}
    td {{ item.is_paid }}
    td {{ item.is_shipped }}
    td {{ item.is_delivered }}
    td.is-lowercase.has-text-extra-small
        span.tag {{ item.marketplace_user_account.marketplace_name }}
    td {{ item.buyer }}
    td {{ item.shipping_method || "Почта России" }}
    td {{ item.currency_code }} {{ item.total_price }} 
</template>

<script>
export default {
    props: ['item'],
}
</script>