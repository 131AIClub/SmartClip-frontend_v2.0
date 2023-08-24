<!-- 这是主页卡片的.vue文件 目前没有使用！！ -->
<template>
  <a-card class="md:w-96  md:max-w-[30vw] cursor-pointer hover:!shadow-around !transition-all card-animate !rounded-xl" :title="title"
          hoverable @click="router.push(link)">
    <template #extra>
      <a-link @click.stop="">More</a-link>
    </template>

    这是关于功能的详细描述    这是关于功能的详细描述    这是关于功能的详细描述    这是关于功能的详细描述    这是关于功能的详细描述    这是关于功能的详细描述

  </a-card>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()

defineProps<{
  title: string
  link: string
}>()


</script>

<style scoped lang="less">
.card-animate:hover {
  transform: translateY(-4px);
}
</style>
