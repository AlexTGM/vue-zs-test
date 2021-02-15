<template lang="pug">
div
    a.is-text.m-r-10(
        @click='$emit("previous")',
        :class='{ disabled: !params.has_previous }'
    ) 
        i.fas.fa-lg.fa-arrow-left

    span.is-opaque {{ params.from }} — {{ params.to }} из {{ params.count }}

    a.is-text.m-l-10(
        @click='$emit("next")',
        :class='{ disabled: !params.has_next }'
    ) 
        i.fas.fa-lg.fa-arrow-right
</template>

<script>
export default {
    props: ['params'],
}
</script>