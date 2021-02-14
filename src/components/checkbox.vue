<template lang="pug">
label.checkbox
    input(type='checkbox', v-model='internal', @change="$emit('input', $event.target.value)")
    span.checkmark
</template>

<script>
export default {
    props: ['value'],

    data: () => ({
        internal: false,
    }),

    watch: {
        value(value) {
            this.internal = value
        }
    },
}
</script>