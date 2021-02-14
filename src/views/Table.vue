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

    table.table
        thead
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
        tbody.has-text-small
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
                td {{ item.shipping_method || 'Почта России' }}
                td {{ item.total_price }} {{ item.currency_code }}
</template>

<script>
import mTextInput from 'components/text-input'

import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: { mTextInput },

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

    computed: mapGetters(['items']),

    methods: mapActions(['fetchData']),
}
</script>

<style lang="sass" scoped>
@import '@/styles/derived'

.container
  margin: 10px

.buttons
  .button + .button
    margin-left: 10px

.level
  display: flex
  justify-content: space-between
  align-items: center

table.table
  width: 100%

  thead
    background-color: white

    th
      font-size: $text-small
      padding: 20px
      opacity: .5

    th:nth-last-child(1)
      border-radius: 0 6px 6px 0

    th:nth-child(1)
      border-radius: 6px 0 0 6px

  tbody
    background-color: white

    td
      font-size: $text-small
      padding: 20px

    tr
      border-bottom: 1px solid $border-color
      margin: 0 20px

    tr:nth-child(1)
      td:nth-child(1)
        border-radius: 6px 0 0 0

      td:nth-last-child(1)
        border-radius: 0 6px 0 0

    tr:nth-last-child(1)
      td:nth-child(1)
        border-radius: 0 0 0 6px

      td:nth-last-child(1)
        border-radius: 0 0 6px 0

    &:before
      line-height: 10px
      content: "."
      background: #E5E5E5
      color: transparent
      display: block

.boolean 

.tag
  padding: 6px 7px 4px 9px
  background-color: $primary
  border-radius: 2px
  color: $white
</style>