import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js"
import store from "./store/index.js"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPenSquare, faEye, faSearch, faMusic, faSignOutAlt,faHeart,faUserAlt,faGuitar,faPlusSquare,faEdit,faStar, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import {  } from '@fortawesome/free-solid-svg-icons'


//import { fas } from '@fortawesome/free-solid-svg-icons'
//library.add(fas)


library.add(faBars, faEye, faSearch, faPenSquare, faMusic, faSignOutAlt,faHeart,faUserAlt,faGuitar,faPlusSquare,faEdit,faStar,faHistory)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)


app.use(router);
app.use(store);
app.mount('#app');
