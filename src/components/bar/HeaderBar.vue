<!-- 这是顶部栏的.vue文件 -->
<template>
  <div id="header-item-dark" v-if="store.$state.dark === true">
    <div class="h-12 md:h-16 px-3 md:px-8 flex justify-between items-center">

      <div class="flex justify-start items-center gap-1">

        <a-image :preview="false" class="w-8 cursor-pointer" src="/logo_white.png" @click="toHomePage"></a-image>

        <div class="text-white font-bold text-lg cursor-pointer" @click="toHomePage">
          SmartClip
        </div>
      </div>

      <div class="flex justify-end items-center gap-3">
        <a-button @click="router.push('/task-center')" class="button-item-dark" type="text">测试任务中心</a-button>
        <a-button @click="router.push('/task-credit-content')" class="button-item-dark" type="text">测试视频编辑页面</a-button>
        <a-button @click="toTaskCenter" size="large" class="button-item-dark" type="text">任务中心</a-button>
        <a-button @click="toPayment" size="large" class="button-item-dark" type="text">充值</a-button>

        <a-button v-if="!store.is_login" @click="router.push('/log-in')" size="large" class="button-item-dark" type="text">
          登录
        </a-button>

        <div v-else>
          <a-popconfirm content="确认退出登录？" @ok="logOut" type="warning" position="br">
            <a-button size="large" class="button-item-dark" type="text">
              退出登录
            </a-button>
          </a-popconfirm>
        </div>

      </div>
    </div>
  </div>

  <div id="header-item-light" v-else>
    <div class="h-12 md:h-16 px-3 md:px-8 flex justify-between items-center">

      <div class="flex justify-start items-center gap-1">

        <a-image :preview="false" class="w-8 cursor-pointer" src="/logo_transparent.png" @click="toHomePage"></a-image>

        <div class="text-black font-bold text-lg cursor-pointer" @click="toHomePage">
          &nbsp;SmartClip
        </div>
      </div>

      <div class="flex justify-end items-center gap-3">
        <a-button @click="router.push('/dashboard/task-center')" class="button-item-light" type="text">测试任务中心</a-button>
        <a-button @click="router.push('/task-credit-content')" class="button-item-light" type="text">测试视频编辑页面</a-button>
        <a-button @click="toTaskCenter" size="large" class="button-item-light" type="text">任务中心</a-button>
        <a-button @click="toPayment" size="large" class="button-item-light" type="text">充值</a-button>

        <a-button v-if="!store.is_login" @click="router.push('/log-in')" size="large" class="button-item-light" type="text">
          登录
        </a-button>

        <div v-else>
          <a-popconfirm content="确认退出登录？" @ok="logOut" type="warning" position="br">
            <a-button size="large" class="button-item-light" type="text">
              退出登录
            </a-button>
          </a-popconfirm>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseStore } from "@/store";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'

const store = UseStore()
const router = useRouter()

//返回主页，且将主题换为黑色
const toHomePage = () => {
  router.push('/')
  store.$state.dark = true
}

//前往任务中心
const toTaskCenter = () => {
  if (!store.$state.is_login) {
    ElMessage({
      type: "error",
      message: "请先登录！",
      center: true
    })
    return
  }

  router.push('/task-center')
}

//点击充值按钮触发事件
const toPayment = () => {
  if (!store.$state.is_login) {
    ElMessage({
      type: "error",
      message: "请先登录！",
      center: true
    })
    return
  }

  router.push('/dashboard/payment')
}

//退出登录
const logOut = () => {
  store.is_login = false
  router.push("/")
  ElMessage({
    type: "success",
    message: "退出成功",
    center: true
  })
}

//修改主题配色
onMounted(() => {
  store.$state.dark = true
})
//

</script>

<style scoped lang="less">
#header-item-dark {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: 1px solid rgb(116, 120, 124);
  z-index: 50;
  background-color: #020617;
}

#header-item-light {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  // border-bottom: 1px solid var(--theme-gray-3); 边线
  z-index: 50;
  background-color: rgb(241,245,249);
}

.button-item-dark {
  color:white;
  font-weight: bold;
  border-radius: 15px;
}

.button-item-dark:hover {
  color: white;
  background-color: #293047;
}

.button-item-light {
  color:black;
  font-weight: bold;
  border-radius: 15px;
}

.button-item-light:hover {
  background: #e2e8f0;
  color:black
}
</style>
