import { createApp } from 'vue'
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBlender as Blender } from '@fortawesome/free-solid-svg-icons'
import { faLeaf as Leaf } from '@fortawesome/free-solid-svg-icons'
import { faApple as Apple } from '@fortawesome/free-brands-svg-icons'
import { faCartPlus as cart } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router"

library.add(Blender);
library.add(Leaf);
library.add(Apple)
library.add(cart);
  
const pinia = createPinia();

createApp(App).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
