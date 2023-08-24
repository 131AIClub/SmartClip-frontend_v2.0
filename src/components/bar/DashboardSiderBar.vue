<!-- 这是左侧菜单栏的.vue文件 -->
<template>
  <div class="h-[calc(100vh-48px)] md:h-[calc(100vh-64px)]  bg-[var(--theme-dark-2)] flex flex-col 
  justify-between items-center">
    <a-menu class="flex-grow" :theme="store.dark ? 'dark' : 'light'" breakpoint="xl" show-collapse-button
      :style="{ width: '200px' }" v-model:selected-keys="keys">

      <!-- 菜单项 -->
      <a-menu-item key="0" @click="router.push('/dashboard/profile')">
        <template #icon>
          <i-ph-user />
        </template>
        账号信息
      </a-menu-item>

      <a-menu-item key="1" @click="router.push('/dashboard/choose-task')">
        <template #icon>
          <i-gridicons-caption />
        </template>
        创建任务
      </a-menu-item>

      <a-sub-menu key="2">
        <template #icon>
          <i-ph-video />
        </template>
        <template #title>全部任务</template>
        <a-menu-item key="2_1" @click="router.push('/dashboard/task')">剪辑任务</a-menu-item>
        <a-menu-item key="2_2" @click="router.push('/dashboard/task-live')">直播任务</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="3" @click="router.push('/dashboard/video-resource')">
        <template #icon>
          <icon-live-broadcast />
        </template>
        视频资源库
      </a-menu-item>

    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { UseStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

const store = UseStore()
const route = useRoute()
const router = useRouter()

const keys = ref([route.meta.dashboard_menu])

watch(() => route.meta, (new_value) => {
  if (new_value) keys.value = [new_value.dashboard_menu]
})

</script>

<style scoped lang="less"></style>
