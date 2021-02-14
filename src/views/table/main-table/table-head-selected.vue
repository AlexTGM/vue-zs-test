<template lang="pug">
tr
    th(@click='$emit("selectAll", true)') 
        m-checkbox(v-model='allSelected')
    th(colspan='11', style='text-align: left')
        a.m-r-10(@click='$emit("update")') Обновить
        a(@click='$emit("delete")') Удалить
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