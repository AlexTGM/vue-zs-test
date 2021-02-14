import Vue from 'vue'

import axios from 'axios'
import store from './store'

import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'https://zonesmart.su/api/v1/'

axios.interceptors.request.use(
    config => {
        const token = store.getters.access_token

        if (token) {
            config.headers = {
                'Authorization': `JWT ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return config;
    },
    error => {
        Promise.reject(error)
    });

axios.interceptors.response.use(
    (response) => {
        return response
    }, async function (error) {
        const originalRequest = error.config;

        const token = store.getters.refresh_token

        if (error.response.status === 401 && token) {
            await store.dispatch('refresh')

            return axios(originalRequest);
        }

        return Promise.reject(error);
    });
