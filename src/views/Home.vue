<template lang="pug">
form.box.is-flex.p-t-40.p-b-40.p-l-50.p-r-50(autocomplete='off')
    h1.title.has-text-centered.m-b-40 Вход

    m-text-input.m-b-30(
        v-model='email',
        type='email',
        placeholder='E-mail или телефон'
    )

    m-text-input.m-b-20(
        v-model='password',
        type='password',
        placeholder='Пароль'
    )

    a.has-text-small.m-b-30(href='#') Забыли пароль?

    button.button.m-b-20(@click='authorize') Войти

    a.has-text-small.has-text-centered(href='#') Зарегистрироваться 
</template>

<script>
import mTextInput from 'components/text-input'

export default {
    components: {
        mTextInput,
    },

    data() {
        return {
            email: null,
            password: null,
        }
    },

    methods: {
        async authorize() {
            const response = await this.$http.post('auth/jwt/create/', {
                email: this.email,
                password: this.password,
            })

            console.log(response)
        },
    },
}
</script>