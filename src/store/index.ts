//vuex配置项，命名规范：下划线命名法+小写
import {defineStore} from "pinia"
import {client} from "@/assets/lib/request";

type StoreType = {
  dark: boolean
  initialized: boolean
  is_mobile: boolean
  is_login: boolean
  user: User | null
  loading: boolean
  video_URL: string
}
export const UseStore = defineStore("main", {
  state: (): StoreType => ({
    dark: true,//默认主题为黑色
    initialized: false,
    is_mobile: window.innerWidth < 768,
    is_login: false,
    user: null,
    loading: false,
    video_URL: "" //首页用到了，也要改！！
  }),
  getters: {},
  actions: {
    toggleTheme() {
      this.dark = !this.dark
      if (this.dark) {
        document.body.setAttribute("arco-theme", "dark")
      } else {
        document.body.removeAttribute("arco-theme");
      }
    },
    async initUser() {
      const res = await client.get<{ user: User }>({url: "user/"})
      if (res.code === 114) {
        this.is_login = true
        this.user = res.data.user
      }
      this.initialized = true
    }
  }
})
