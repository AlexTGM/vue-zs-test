import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faEye, faEyeSlash, faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faEyeSlash, faCheckCircle, faCircle, faArrowLeft, faArrowRight, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)