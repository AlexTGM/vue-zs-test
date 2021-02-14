<template lang="pug">
div
    a.is-primary.m-r-10(
        @click='$emit("previous")',
        :class='{ disabled: !params.has_previous }'
    ) <-

    span.is-opaque {{ params.from }} - {{ params.to }} из {{ params.count }}

    a.is-primary.m-l-10(
        @click='$emit("next")',
        :class='{ disabled: !params.has_next }'
    ) ->
</template>

<script>
export default {
    props: ['params'],
}
</script>