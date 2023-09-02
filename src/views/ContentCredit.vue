<!-- 这是任务编辑的.vue文件 -->
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
                            <a-steps :current="1" type="dot">
                                <a-step>内容编辑</a-step>
                                <a-step>样式编辑</a-step>
                                <a-step>后台处理</a-step>
                            </a-steps>
                        </div>

                    </a-space>

                </div>

                <a-divider style="background-color: #74787c; height: 1px;"></a-divider>

                <!-- 文本/标题文案切换按钮 -->
                <div>

                    <a-space>
                        <a-radio-group v-model:model-value="creditContent">
                            <a-grid :cols="2" :col-gap="20">
                                <a-grid-item>
                                    <a-radio value="1">
                                        <template #radio="{ checked }">
                                            <a-tag :checked="checked" checkable id="radioItem"
                                                class="text-white font-bold text-lg">
                                                <template #icon>
                                                    <icon-language />
                                                </template>
                                                &nbsp;视频文本
                                            </a-tag>
                                        </template>
                                    </a-radio>
                                </a-grid-item>
                                <a-grid-item>
                                    <a-radio value="2">
                                        <template #radio="{ checked }">
                                            <a-tag :checked="checked" checkable id="radioItem"
                                                class="text-white font-bold text-lg">
                                                <template #icon>
                                                    <icon-edit />
                                                </template>
                                                &nbsp;标题文案
                                            </a-tag>
                                        </template>
                                    </a-radio>
                                </a-grid-item>
                            </a-grid>
                        </a-radio-group>
                    </a-space>
                </div>

                <div class="h-[2vh] "></div>

                <!-- 具体内容 -->
                <div>
                    <!-- 文本 -->
                    <el-scrollbar height="520px" v-if="creditContent === '1'">
                        <p v-for="item in 20" :key="item" class="scrollbar-item">test111</p>
                    </el-scrollbar>
                    <!-- 标题 -->
                    <el-scrollbar height="520px" v-if="creditContent === '2'">
                        <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">test222</p> -->

                        <div class="scrollbar-item">
                            <!-- 标题 -->
                            <div>
                                <a-space direction="vertical" size="mini">
                                    <span class="font-bold text-xl">
                                        标题信息
                                    </span>

                                    <div class="h-[1vh] "></div>

                                    <!-- 输入框 -->
                                    <div>
                                        <a-input class="input-item" :max-length="50">
                                        </a-input>
                                    </div>

                                    <div class="h-[1vh] "></div>

                                    <!-- <a-divider style="background-color: gray;height: 0.1px; "></a-divider> -->

                                    <span class="font-bold text-xl">
                                        简介信息
                                    </span>


                                    <div class="h-[1vh] "></div>

                                    <!-- 输入框 -->
                                    <div>
                                        <a-textarea placeholder="Please enter something" class="textarea-item" 
                                        :max-length="250" auto-size/>
                                    </div>
                                </a-space>

                            </div>
                            <!-- 简介 -->
                            <div>

                            </div>
                        </div>

                    </el-scrollbar>
                </div>

            </div>

            <!-- 水平分割线 -->
            <!-- <div class="w-px  " style="height: 780px; background-color: #74787c;"></div> -->
            <a-divider direction="vertical" style="background-color: #74787c; height: 760px;"></a-divider>

            <!-- 右边 -->
            <div class="flex-grow p-4" style="flex: 1;">
                <!-- 顶部按钮 -->
                <div class="flex justify-end">
                    <a-button type="text" class="font-bold text-lg " shape="round" size="large"
                        style="height: 40px; color: black; background-color: white;" @click="toNext">
                        Next
                        <template #icon>
                            <icon-right />
                        </template>

                    </a-button>
                </div>

                <div class="h-[4vh] "></div>

                <!-- 视频预览 -->
                <div class="flex justify-center items-center">
                    <video ref="videoItem" class="rounded-2xl overflow-hidden" style="object-fit: cover; width: 320px;">
                        <source src="/videoTemplate.mp4" type="video/mp4">
                        该浏览器不支持播放视频
                    </video>
                </div>

                <!-- 视频控制按钮 -->
                <div class="flex justify-center items-center">

                    <a-button type="text" @click="lastClip" shape="circle" class="text-white text-lg">
                        <template #icon>
                            <icon-backward />
                        </template>
                    </a-button>

                    <a-button type="text" v-if="!isVideoPlay" @click="playVideo" shape="circle" class="text-white text-lg">
                        <template #icon>
                            <icon-play-arrow />
                        </template>
                    </a-button>

                    <a-button type="text" v-else @click="stopVideo" shape="circle" class="text-white text-lg">
                        <template #icon>
                            <icon-pause />
                        </template>
                    </a-button>

                    <a-button type="text" @click="nextClip" shape="circle" class="text-white text-lg">
                        <template #icon>
                            <icon-forward />
                        </template>
                    </a-button>
                </div>

            </div>

        </div>

        <div class="mt-auto">
            <time-line></time-line>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import { onMounted, ref } from "vue";
import { UseStore } from "@/store";
import { useRouter } from "vue-router";

const store = UseStore()
const router = useRouter()

document.body.setAttribute('arco-theme', 'dark')


// onMounted(() => {
//   if (document.body.id !== "hid")
//     document.body.setAttribute("id","hid")
// })

const creditContent = ref("1")
const isVideoPlay = ref(false)
const videoItem = ref()//对video标签的引用

//返回任务中心
const toTaskCenter = () => {
    router.push("/dashboard/task-center")
}

//右侧视频按钮相关函数
const lastClip = () => {

}

const playVideo = () => {
    isVideoPlay.value = !isVideoPlay.value
    if(videoItem.value.paused)
        videoItem.value.play()
}

const stopVideo = () => {
    isVideoPlay.value = !isVideoPlay.value
    if(!videoItem.value.paused)
        videoItem.value.pause()
}

const nextClip = () => {
    
}
//

//下一页的按钮
const toNext = () => {
    router.push('/task-credit-template')
}
//


</script>
  
<style scoped lang="less">
#radioItem {
    width: 380px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
}

.scrollbar-item {
    display: flex;
    align-items: center;
    height: auto;
    margin: 10px;
    text-align: left;
    border-radius: 4px;
    background: #020617;
    color: white;
    padding: 20px;
    border-radius: 20px;
}

.scrollbar-item:hover {
    background: #0f172a;
}

//输入框信息
.input-item {
    background: white;
    color: black;
    border-radius: 10px;
    width: 720px;
    height: 40px;
}

//长文本框信息
.textarea-item {
    background: white;
    color: black;
    border-radius: 10px;
    width: 720px;
    height: 80px;
}


//这个没用，正式使用时放心删掉
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: gray;
    color: white;
}
</style>
  