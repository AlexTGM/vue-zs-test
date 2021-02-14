<template lang="pug">
div
    a(@click='$emit("previous")', :disabled='!has_previous') previous
    span {{ from }} - {{ to }} из {{ count }}
    a(@click='$emit("next")', :disabled='!has_next') next
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['has_previous', 'has_next', 'count', 'from', 'to']),
    },
}
</script>