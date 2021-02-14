<template lang="pug">
tr
    th(@click="$emit('selectAll', true)") x
    th(colspan="11" style="text-align: left")
        a.m-r-10(@click="$emit('update')") Обновить
        a(@click="$emit('delete')") Удалить
</template>