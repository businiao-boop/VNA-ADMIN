import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Plugins from './plugins'
import "@/assets/styles/tailwind.css"
import "@/assets/styles/index.scss"
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(Plugins)
app.use(router)

app.mount('#app')
