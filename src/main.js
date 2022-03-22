import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "../src/scss/styles.scss";


const app = createApp(App)

app.use(router)

app.mount('#app')
