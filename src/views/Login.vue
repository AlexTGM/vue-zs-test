<template lang="pug">
form.box.is-flex.p-t-40.p-b-40.p-l-50.p-r-50
    h1.title.has-text-centered.m-b-40 Вход

    m-text-input.m-b-30(
        v-model='form.email',
        type='email',
        placeholder='E-mail или телефон',
    )

    m-text-input.m-b-20(
        v-model='form.password',
        type='password',
        placeholder='Пароль',
    )

    a.has-text-small.m-b-30(href='#') Забыли пароль?

    button.button.m-b-20(@click.prevent='authorize') Войти

    a.has-text-small.has-text-centered(href='#') Зарегистрироваться
</template>

<script>
import mTextInput from 'components/text-input'

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

    computed: mapGetters(['is_logged']),

    methods: {
        ...mapActions(['login']),
        async authorize() {
            await this.login(this.form)

            if (this.is_logged) {
                this.$router.push('/')
            } else {
                console.log('Something went wrong')
            }
        },
    },
}
</script>