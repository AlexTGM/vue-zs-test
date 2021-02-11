<template lang="pug">
.control
    input.input(
        ref='input',
        autocomplete='nope',
        placeholder=' ',
        :value='computedValue',
        :class="[ { 'is-error': error } ]"
        :type='newType',
        @input='onInput',
        @change='onChange'
    )

    label.placeholder {{ placeholder }}

    span(v-if='type === "password"', @click='togglePasswordVisibility')
        font-awesome-icon(size='lg', :icon='["fas", passwordVisibleIcon]')
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        error: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            newValue: this.value,
            newType: this.type,
            isPasswordVisible: false,
        }
    },

    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
            },
        },

        passwordVisibleIcon() {
            return !this.isPasswordVisible ? 'eye' : 'eye-slash'
        },
    },

    methods: {
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible
            this.newType = this.isPasswordVisible ? 'text' : 'password'

            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },

        onInput(event) {
            this.computedValue = event.target.value
        },

        onChange(event) {
            this.computedValue = event.target.value
        },
    },

    watch: {
        value(value) {
            this.newValue = value
        },
    },
}
</script>

<style lang="sass" scoped>
span
    cursor: pointer
    position: absolute
    top: 50%
    right: 15px
    transform: translateY(-50%)
</style>