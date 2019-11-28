import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faList, faSearch, faUser, faCog, faSignOutAlt, faEnvelope, faQuestion,
    faBan, faTrashAlt, faAlignLeft, faEye, faUpload, faFileCode, faArrowDown,
    faArrowUp, faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import {
    faFlickr, faFacebookSquare, faTwitterSquare, faInstagram
} from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faList, faSearch, faUser, faCog, faEnvelope, faQuestion, faSignOutAlt,
    faBan, faTrashAlt, faAlignLeft, faEye, faUpload, faArrowDown, faArrowUp, faCheckCircle,
    faFileCode, faFlickr, faFacebookSquare, faTwitterSquare, faInstagram)

Vue.component('font-awesome-icon', FontAwesomeIcon)
