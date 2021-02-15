<template lang="pug">
font-awesome-icon(:icon='icon', size='lg', class="is-primary")
</template>

<script>
export default {
    props: ['value'],

    data: () => ({
        icon: 'circle',
    }),

    created() {
        if (!this.value) this.icon = ['far', 'circle']
        else this.icon = ['fas', 'check-circle']
    },
}
</script>