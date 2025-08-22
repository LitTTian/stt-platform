import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const app = createApp(App)
const vuetify = createVuetify()

app.use(createPinia())
app.use(router)
app.use(vuetify) // Vuetify 3 组件库

app.mount('#app')
