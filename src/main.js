import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementPlus from 'element-plus'
import HighchartsVue from 'highcharts-vue'
import 'element-plus/dist/index.css'
import '../src/scss/styles.scss'

const app = createApp(App)
// for font fontawesome
library.add(fas)
app.component('fa', FontAwesomeIcon)

//elemnt plus
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(HighchartsVue)

app.mount('#app')
