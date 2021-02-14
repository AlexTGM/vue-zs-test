import Vue from 'vue'

import moment from 'moment'
import numeral from 'numeral'

Vue.filter('plural', (count, word) => {
    const base = `${count} ${word}`

    if (count === 1) return base
    else if (count >= 2 && count <= 4) return `${base}а`
    else return `${base}ов`
})

Vue.filter('date', (date, format) => moment(date).format(format))

Vue.filter('currency', code => code === 'USD' ? '$' : code)

Vue.filter("formatNumber", value => numeral(value).format("0.00"))