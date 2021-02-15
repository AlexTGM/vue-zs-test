<template lang="pug">
fragment
    tr
        th.is-narrow
            m-checkbox(
                @input='$emit("selectAll", selectedLength)'
                :value='allSelected'
            )

        fragment(v-if="selectedLength")
            th(colspan='11', style='text-align: left')
                a.m-r-10(@click='$emit("update")') Обновить
                a(@click='$emit("delete")') Удалить

        fragment(v-else)
            th.is-opaque ID
            th.is-opaque Товары
            th.is-narrow.is-opaque Дата заказа
            th.is-narrow.is-opaque Статус
            th.is-narrow.is-opaque Оплачено
            th.is-narrow.is-opaque Отправлено
            th.is-narrow.is-opaque Доставлено
            th.is-narrow.is-opaque Канал продаж
            th.is-narrow.is-opaque Покупатель
            th.is-narrow.is-opaque Метод отправки
            th.is-narrow.is-opaque.has-text-right Стоимость
</template>

<script>
import mCheckbox from 'components/checkbox'

export default {
    components: {
        mCheckbox,
    },

    props: ['selectedLength', 'allSelected'],
}
</script>