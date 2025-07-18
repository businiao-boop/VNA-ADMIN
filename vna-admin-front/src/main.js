import { createApp } from 'vue'
import App from './App.vue'
import Plugins from './plugins'
import "@/assets/styles/index.scss"

const app = createApp(App)

app.use(Plugins)

app.mount('#app')
