import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js"
import store from "./store/index.js"
import BaseCard from "./components/ui/BaseCard.vue"

import { faHeart as HeartRegular, faTimesCircle } from "@fortawesome/free-regular-svg-icons"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPenSquare, faEye, faSearch, faMusic, faSignOutAlt, faUserAlt, faGuitar, faPlusSquare, faEdit, faStar, faHistory, faClipboard, faClipboardList, faQuestionCircle, faThumbtack, faPlayCircle, faHeadphones, faHeart, faVolumeUp, faArrowLeft, faTrashAlt, faMoon, faSun, faMapPin, faCheckSquare, faSave, faLock, faEnvelope, faAngleRight, faAngleLeft, faStickyNote, faArrowUp, faEyeSlash, faLockOpen, faPauseCircle, faMinus, faPlus, faDrum, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faEye, faSearch, faPenSquare, faMusic, faSignOutAlt, faHeart, faUserAlt, faGuitar, faPlusSquare, faEdit, faStar, faHistory, faClipboard, faClipboardList, faQuestionCircle, faThumbtack, faPlayCircle, faHeadphones, faVolumeUp, faArrowLeft, faTrashAlt, HeartRegular, faMoon, faSun, faMapPin, faTimesCircle, faCheckSquare, faSave, faLock, faEnvelope, faAngleRight, faAngleLeft, faStickyNote, faArrowUp, faEyeSlash, faAngleLeft, faAngleRight, faLockOpen, faPauseCircle, faMinus, faPlus, faDrum, faListUl)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('base-card', BaseCard)


app.use(router);
app.use(store);
app.mount('#app');
