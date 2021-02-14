<template lang="pug">
tr
    th(@click='$emit("selectAll")') 
        m-checkbox(v-model='allSelected')
    th ID
    th Товары
    th Дата заказа
    th Статус
    th Оплачено
    th Отправлено
    th Доставлено
    th Канал продаж
    th Покупатель
    th Метод отправки
    th Стоимость
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
