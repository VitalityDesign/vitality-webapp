import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'

import ElementUI from 'element-plus';

createApp(App)
    .use(ElementUI)
    .mount('#app')
