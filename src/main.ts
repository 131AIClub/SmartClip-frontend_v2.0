import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import {createPinia} from "pinia"

//引入elementUi
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入时间轴
// import TimeLineCanvas from "./components/timeline-canvas.vue";

const pinia = createPinia()

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount("#app")

//使用时间轴
// app.use(TimeLineCanvas)

import "animate.css"
import "@/assets/styles/base.css"
import "@/assets/styles/theme.less"
import "@/assets/styles/tailwind.less"
import "@/assets/styles/transition.less"
