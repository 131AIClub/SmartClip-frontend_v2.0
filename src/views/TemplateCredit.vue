<!-- 这是样式编辑的.vue文件 -->
<template>
    <div class="flex flex-col h-screen" style="background-color:  #020617;">

        <div class="flex ">
            <!-- 左边 -->
            <div class="flex-grow p-4 " style="flex: 1;">
                <!-- 顶部按钮 -->
                <div>
                    <a-space>
                        <a-button type="text" class="text-white font-bold text-xl" shape="round" size="large"
                            style="height: 50px;" @click="toTaskCenter">
                            <template #icon>
                                <icon-arrow-left />
                            </template>
                            返回任务中心
                        </a-button>

                        <div class="w-8"></div>

                        <a-divider direction="vertical" style="background-color: #74787c; height: 60px; "></a-divider>

                        <div class="w-8"></div>

                        <div style="margin-top: 20px;">
                            <a-steps :current="2" type="dot">
                                <a-step>内容编辑</a-step>
                                <a-step>样式编辑</a-step>
                                <a-step>后台处理</a-step>
                            </a-steps>
                        </div>

                    </a-space>

                </div>

                <a-divider style="background-color: #74787c; height: 1px;"></a-divider>

            </div>

            <!-- 水平分割线 -->
            <!-- <div class="w-px  " style="height: 780px; background-color: #74787c;"></div> -->
            <a-divider direction="vertical" style="background-color: #74787c; height:93vh;"></a-divider>

            <!-- 右边 -->
            <div class="flex-grow p-4" style="flex: 1;">
                <!-- 顶部按钮 -->
                <div class="flex justify-end">
                    <a-button type="text" class="font-bold text-lg " shape="round" size="large"
                        style="height: 40px; color: black; background-color: white;">
                        Next
                        <template #icon>
                            <icon-right />
                        </template>

                    </a-button>
                </div>

                <div class="h-[4vh] "></div>

                <!-- 视频预览 -->
                <div class="flex justify-center items-center">
                    <video controls class="rounded-2xl overflow-hidden" style="object-fit: cover; width: 400px;">
                        <source src="/videoTemplate.mp4" type="video/mp4">
                        该浏览器不支持播放视频
                    </video>
                </div>

               


            </div>

        </div>

    </div>
</template>
  
<script setup lang="ts">

import { onMounted, ref } from "vue";
import { UseStore } from "@/store";
import { useRouter } from "vue-router";

const store = UseStore()
const router = useRouter()

const isVideoPlay = ref(false)

//返回任务中心
const toTaskCenter = () => {
    router.push("/dashboard/task-center")
}
//



</script>
  
<style scoped lang="less"></style>
  