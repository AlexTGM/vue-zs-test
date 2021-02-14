<template lang="pug">
div
    a.is-primary.m-r-10(
        @click='$emit("previous")',
        :class='{ disabled: !params.has_previous }'
    ) 
        font-awesome-icon(:icon='["fas", "arrow-left"]', size='lg')

    span.is-opaque {{ params.from }} — {{ params.to }} из {{ params.count }}

    a.is-primary.m-l-10(
        @click='$emit("next")',
        :class='{ disabled: !params.has_next }'
    ) 
        font-awesome-icon(:icon='["fas", "arrow-right"]', size='lg')
</template>

<script>
export default {
    props: ['params'],
}
</script>