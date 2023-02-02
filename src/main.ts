import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import AppInput from '@/components/common/AppInput.vue'
import AppSelect from '@/components/common/AppSelect.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('AppInput', AppInput)
app.component('AppSelect', AppSelect)

app.mount('#app')
