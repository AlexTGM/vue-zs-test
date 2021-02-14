<template lang="pug">
label.checkbox
    input(type='checkbox', v-model='internal', @change="$emit('input', !internal)")
    span.checkmark
</template>

<script>
export default {
    props: ['value'],

    data: () => ({
        internal: false,
    }),

    created() {
        this.internal = this.value
    },

    watch: {
        value(value) {
            this.internal = value
        }
    },
}
</script>