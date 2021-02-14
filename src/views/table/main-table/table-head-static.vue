<template lang="pug">
tr.is-opaque
    th.is-narrow(@click='$emit("selectAll")') 
        m-checkbox(:value='allSelected')
    th ID
    th Товары
    th.is-narrow Дата заказа
    th.is-narrow Статус
    th.is-narrow Оплачено
    th.is-narrow Отправлено
    th.is-narrow Доставлено
    th.is-narrow Канал продаж
    th.is-narrow Покупатель
    th.is-narrow Метод отправки
    th.is-narrow Стоимость
</template>

<script>
import mCheckbox from 'components/checkbox'

export default {
    components: {
        mCheckbox,
    },

    props: ['allSelected'],
}
</script>
