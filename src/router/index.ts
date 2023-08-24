//路由路径命名规范：path:word-word(小写)
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {UseStore} from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      depth: 0
    }
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardPage.vue"),
    children: [
      {
        path: "",
        redirect: "/dashboard/profile"
      },
      {//菜单栏：账号信息
        path: "profile",
        component: () => import("@/components/dashboard/UserProfile.vue"),
        meta: {
          auth: true,//要求登录才能访问
          depth: 1,//页面深度
          dashboard_menu: "0",//路由与侧边栏的对应
          dashboard_breadcrumb: ["账号信息"]//菜单展示项
        }
      },
      {
        path: "payment",
        component: () => import("@/components/dashboard/PayMoney.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "0",
          dashboard_breadcrumb: ["账号信息","积分充值"]
        }
      },
      {
        path: "payment-result",
        component: () => import("@/components/dashboard/PayResult.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "0",
          dashboard_breadcrumb: ["账号信息","积分充值","充值结果"]
        }
      },
      {//菜单栏：创建任务
        path: "choose-task",
        component: () => import("@/components/dashboard/ChooseTask.vue"),
        meta: {
          auth: true,
          depth:1,
          dashboard_menu: "1",
          dashboard_breadcrumb: ["创建任务"]
        }
      },
      {
        path: "create-task",
        component: () => import("@/components/dashboard/CreateTask.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "1",
          dashboard_breadcrumb: ["创建任务","视频剪辑"]
        }
      },
      {
        path: "create-task/:task_id",
        component: () => import("@/components/dashboard/CreateTask.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "1",
          dashboard_breadcrumb: ["创建任务", "视频剪辑","编辑草稿"]
        }
      },
      {
        path:"create-task-live",
        component: () => import("@/components/dashboard/CreateTaskLive.vue"),
        meta: {
          auth:true,
          depth:2,
          dashboard_menu: "1",
          dashboard_breadcrumb: ["创建任务","直播推流"]
        }
      },
      {//全部任务
        path: "task",
        component: () => import("@/components/dashboard/AllTask.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2_1",
          dashboard_breadcrumb: ["全部任务","剪辑任务"]
        }
      },
      {
        path: "task/:task_id",
        component: () => import("@/components/dashboard/TaskDetail.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2",
          dashboard_breadcrumb: ["全部任务", "剪辑任务","任务详情"]
        }
      },
      {
        path: "task-live",
        component: () => import("@/components/dashboard/AllTaskLive.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2_2",
          dashboard_breadcrumb: ["全部任务","直播推流任务"]
        }
      },
      {
        path:"task-live/:task_id",
        component: () => import("@/components/dashboard/TaskDetailLive.vue"),
        meta:{
          auth: true,
          depth: 1,
          dashboard_menu: "2_2",
          dashboard_breadcrumb: ["全部任务","直播推流任务","任务详情"]
        }
      },
      {//视频资源库
        path:"video-resource",
        component: () => import("@/components/dashboard/VideoResource.vue"),
        meta: {
          auth:true,
          depth:1,
          dashboard_menu: "3",
          dashboard_breadcrumb: ["视频资源库"]
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = UseStore()
  if (!store.initialized) {
    const inter = setInterval(() => {
      if (store.initialized) {
        if (to.meta.auth && !store.is_login) {
          next(`/?next=${to.path}`)
          store.show_sign_modal = true
        } else {
          next()
        }
        clearInterval(inter)
      }
    }, 50)
  } else {
    if (to.meta.auth && !store.is_login) {
      next(`/?next=${to.path}`)
      store.show_sign_modal = true
      return
    }
    next()
  }


})

export const safeBack = function (path: string) {
  return !window.history.state.back && path ? router.replace(path || "/") : router.back()
}

export default router
