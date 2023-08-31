<!-- 这是任务编辑的.vue文件 -->
<template>
    <div class="flex flex-col h-screen bg-black">
        <!-- <div class="flex-grow">
            
        </div> -->

        <div class="flex ">
            <!-- 左边 -->
            <div class="flex-grow p-4 ">
                <!-- 顶部按钮 -->
                <div>
                    <a-button>返回任务中心</a-button>
                </div>

                <!-- 文本/标题文案切换按钮 -->
                <div>

                </div>

                <!-- 具体内容 -->
                <div>

                </div>

            </div>

            <!-- 水平分割线 -->
            <div class="w-px  " style="height: 780px; background-color: #74787c;"></div>

            <!-- 右边 -->
            <div class="flex-grow p-4">
                <!-- 顶部按钮 -->
                <div>

                </div>

                <!-- 视频预览 -->
                <div>

                </div>
            </div>
        </div>


        <div class="mt-auto">
            <time-line-canvas></time-line-canvas>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import TimeLineCanvas from "../components/tool/timeline-canvas.vue";
import { onMounted } from "vue";

// onMounted(() => {
//   if (document.body.id !== "hid")
//     document.body.setAttribute("id","hid")
// })



</script>
  
<style scoped lang="less">
// #hid .template {
//   display: none;
// }
</style>
  