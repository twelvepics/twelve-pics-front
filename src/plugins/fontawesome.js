import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faList, faSearch, faUser, faCog, faSignOutAlt, faEnvelope, faQuestion,
    faBan, faTrashAlt, faAlignLeft, faEye, faUpload
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faList, faSearch, faUser, faCog, faEnvelope, faQuestion, faSignOutAlt, faBan, faTrashAlt, faAlignLeft, faEye, faUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
