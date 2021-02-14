<template lang="pug">
.container
    .level.m-b-30
        .level-left
            h1.title Таблица заказов

        .level-right
            .buttons
                button.button.is-small.is-secondary отправления
                button.button.is-small экспортировать

    .level.m-b-20
        button.button.is-secondary.m-r-30 фильтр
        m-text-input.is-fullwidth(
            v-model='query',
            type='text',
            placeholder='Поиск'
        )

    m-table(
        :count='count',
        :has_next='has_next',
        :has_previous='has_previous',
        @next='getNext',
        @previous='getPrevious'
    )
        template(v-slot:head)
            tr
                th x
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
        template(v-slot:row)
            tr(v-for='item in items')
                td X
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
                td {{ item.total_price }} {{ item.currency_code }}
</template>

<script>
import mTextInput from 'components/text-input'

import mTable from 'components/table/table'

import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: { mTextInput, mTable },

    data: () => ({
        query: null,
    }),

    filters: {
        plural: (count, word) => {
            const base = `${count} ${word}`

            if (count === 1) return base
            else if (count >= 2 && count <= 4) return `${base}а`
            else return `${base}ов`
        },
        date: (date, format) => moment(date).format(format),
    },

    async created() {
        await this.fetchData()
    },

    computed: mapGetters(['items', 'count', 'has_next', 'has_previous']),

    methods: mapActions(['fetchData', 'getNext', 'getPrevious']),
}
</script>