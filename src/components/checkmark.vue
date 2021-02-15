<template lang="pug">
i.fa-lg.is-primary(:class="icon")
</template>

<script>
export default {
    props: ['value'],

    data: () => ({
        icon: 'circle',
    }),

    created() {
        if (!this.value) this.icon = ['far', 'fa-circle']
        else this.icon = ['fas', 'fa-check-circle']
    },
}
</script>