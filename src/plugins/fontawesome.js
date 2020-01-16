import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faList, faSearch, faUser, faCog, faSignOutAlt, faEnvelope, faQuestion, faCamera,
    faBan, faTrashAlt, faAlignLeft, faEye, faUpload, faFileCode, faArrowDown, faStar,
    faArrowUp, faCheckCircle, faArrowsAlt
} from '@fortawesome/free-solid-svg-icons'
import {
    faFlickr, faFacebookSquare, faTwitterSquare, faInstagram
} from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faList, faSearch, faUser, faCog, faEnvelope, faQuestion, faSignOutAlt, faCamera,
    faBan, faTrashAlt, faAlignLeft, faEye, faUpload, faArrowDown, faArrowUp, faCheckCircle, faStar,
    faFileCode, faArrowsAlt, faFlickr, faFacebookSquare, faTwitterSquare, faInstagram)

Vue.component('font-awesome-icon', FontAwesomeIcon)
