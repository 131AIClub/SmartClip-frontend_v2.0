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

                <!-- 在这里展示所有的模板 -->
                <div>
                    <el-scrollbar always height="75vh">
                        <a-grid :cols="3">
                            <!-- 模板选择放在这儿 -->
                            <!-- <p v-for="item in 200" :key="item" class="scrollbar-item">test111</p> -->
                            <!-- 这里展示模板的小卡片-->
                            <div class="card-item flex item-center justify-center cursor-pointer"
                                v-for="template in templates" :key="template.templateId" @click="chooseTemplate(template)">
                                <a-space direction="vertical">
                                    <div class="h-[1.5vh]"></div>

                                    <a-image :src="template.previewImageUrl" height="400" class="image-item" fit="cover"
                                        :preview="false">
                                    </a-image>

                                    <div class="flex item-center justify-center font-bold text-xl"
                                        style="font-family: '楷体';">
                                        {{ template.templateName }}
                                    </div>

                                    <div class="h-[1.5vh]"></div>
                                </a-space>
                            </div>

                        </a-grid>
                    </el-scrollbar>
                </div>

            </div>

            <!-- 水平分割线 -->
            <!-- <div class="w-px  " style="height: 780px; background-color: #74787c;"></div> -->
            <a-divider direction="vertical" style="background-color: #74787c; height:93vh;"></a-divider>

            <!-- 右边 -->
            <div class="flex-grow p-4" style="flex: 1;">
                <!-- 顶部按钮 -->
                <div class="flex justify-end">
                    <a-button type="text" class="font-bold text-lg " shape="round" size="large"
                        style="height: 40px; color: black; background-color: white;" @click="toFinish">
                        Finish
                        <template #icon>
                            <icon-right />
                        </template>

                    </a-button>
                </div>

                <div class="h-[4vh] "></div>

                <!-- 视频预览 -->
                <div class="flex justify-center items-center">
                    <video ref="videoItem" class="rounded-2xl overflow-hidden" style="object-fit: cover; width: 360px;">
                        <source :src="currentTemplate.previewVideoUrl" type="video/mp4">
                        该浏览器不支持播放视频
                    </video>
                </div>

                <div class="h-[1vh]"></div>

                <div class="flex justify-center items-center">
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

                    <a-button type="text" @click="resetVideo" shape="circle" class="text-white text-lg">
                        <template #icon>
                            <icon-record-stop />
                        </template>
                    </a-button>

                </div>


            </div>

        </div>

    </div>
</template>
  
<script setup lang="ts">

import { onMounted, ref } from "vue";
import { UseStore } from "@/store";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { client } from "@/assets/lib/request";
import { Notification } from "@arco-design/web-vue";

const store = UseStore()
const router = useRouter()
const route = useRoute()

const isVideoPlay = ref(false)
const videoItem = ref(null)//video组建的引用

//得到对象数组
const res = await client.get<{ templates: Template[] }>({ url: "template/" })
const templates = res.data.templates
if (res.code !== 114) {
    Notification.error({
        content: res.msg,
        closable: true,
        duration: 1000000,
    })
}
//

//修改主题配色
onMounted(() => {
    store.$state.dark = true
})
//

//返回任务中心
const toTaskCenter = () => {
    router.push("/dashboard/task-center")
}
//

//视频按钮相关函数
const playVideo = () => {
    isVideoPlay.value = !isVideoPlay.value
    if (videoItem.value.paused)
        videoItem.value.play()
}

const stopVideo = () => {
    isVideoPlay.value = !isVideoPlay.value
    if (!videoItem.value.paused)
        videoItem.value.pause()
}

const resetVideo = () => {
    videoItem.value.currentTime = 0
    if (isVideoPlay.value === true)
        isVideoPlay.value = false
    if (!videoItem.value.paused)
        videoItem.value.pause()
}
//

//点击选择模板
const currentTemplate = ref(templates[0])
const chooseTemplate = (chosenTemplate: Template) => {
    currentTemplate.value = chosenTemplate
}
//

//点击finish，提交模板渲染任务
const toFinish = async () => {
    const res = await client.post<{}>({
        url: `task/${route.query?.task_id}/template_apply`,
        data: { templateId: currentTemplate.value.templateId }
    })
    if(res.code === 114) {
        Notification.success({
            content:"提交成功！"
        })
        router.push('/task-center')
    } else {
        Notification.error({
            content: res.msg,
            closable: true,
            duration: 1000000,
        })
    }
}
//

</script>
  
<style scoped lang="less">
.card-item {
    border-radius: 20px;
}

.card-item:hover {
    background: #0f172a;
}

.image-item {
    border-radius: 20px;

}
</style>
  