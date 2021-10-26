import { createApp } from 'vue'
import App from './App.vue'
import Element from "element-plus"
import "element-plus/theme-chalk/index.css"
import "./assets/reset.css"
import router from "./router"
import store from "./vuex"
createApp(App).use(Element).use(router).use(store).mount('#app')
