<template lang="pug">
form.box.is-flex.p-t-40.p-b-40.p-l-50.p-r-50
    h1.title.has-text-centered.m-b-40 Вход

    m-text-input.m-b-30(
        v-model='form.email',
        type='email',
        placeholder='E-mail или телефон',
        :error='$v.form.email.$invalid'
    )

    m-text-input.m-b-20(
        v-model='form.password',
        type='password',
        placeholder='Пароль',
        :error='$v.form.password.$invalid'
    )

    span.has-text-small.is-danger.m-b-10(v-if='auth_failed')
        | Введенные данные некорректны

    a.has-text-small.m-b-30(href='#') Забыли пароль?

    button.button.m-b-20(@click.prevent='authorize') Войти

    a.has-text-small.has-text-centered(href='#') Зарегистрироваться
</template>

<script>
import mTextInput from 'components/text-input'

import { required, email } from 'vuelidate/lib/validators'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        mTextInput,
    },

    data: () => ({
        form: {
            email: null,
            password: null,
        },
    }),

    validations: {
        form: {
            email: { required, email },
            password: { required },
        },
    },

    computed: mapGetters(['auth_failed']),

    methods: {
        ...mapActions(['login']),
        
        async authorize() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) return

            await this.login(this.form)

            if (!this.auth_failed)
                this.$router.push('/')
        },
    },
}
</script>