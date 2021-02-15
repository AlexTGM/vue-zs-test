<template lang="pug">
div.item
    img(:src="image" width=40 height=40)
    div.m-l-20.title
        span {{ item.title }}
        span.has-text-small.is-opaque {{ item.sku }}
</template>

<script>
export default {
    props: [ 'item' ],

    computed: {
        image() {
            return this.item.main_image ?? 'https://via.placeholder.com/40'
        }
    }
}
</script>

<style lang="sass" scoped>
div.item
    background-color: white
    display: flex

div.title
    display: flex
    flex-flow: column
    justify-content: center
</style>