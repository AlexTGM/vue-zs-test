<template lang="pug">
img.image(:src='src', :style='imgStyle')
</template>

<script>
export default {
    props: {
        src: String,
        width: Number,
        height: Number,
    },

    setup(props) {
        return {
            imgStyle: {
                width: `${props.width}px`,
                height: `${props.height}px`,
            },
        }
    },
}
</script>