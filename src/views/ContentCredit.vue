<!-- 这是任务编辑的.vue文件 -->
<template>
    <div class="flex flex-col h-screen" style="background-color:  #020617;">

        <div class="flex ">
            <div class="flex-grow p-4 " style="flex: 1;">
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
                                            <a-tag :checked="checked" checkable id="radioItem" class="font-bold text-lg">
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

                <div>
                    <el-scrollbar height="497px" v-if="creditContent === '1'">
                        <p v-for="(sentence, index) in videoTexts" class="scrollbar-item"
                            @click="toCurrentSentence(sentence.startTime)">
                            <a-space direction="vertical">
                                <span class="sentence-time">
                                    {{ millisecondsToTimeString(sentence.startTime) }}
                                </span>
                                <span v-if="editIndex !== index" class="sentence-content" @click="changeSentence(index)">
                                    {{ sentence.text }}
                                </span>
                                <input v-else v-model="sentence.text" ref="inputItem" class="sentence-edit"
                                    @blur="loseFocus">
                            </a-space>


                            <!-- <icon-pen v-if="editIndex === -1" class="icon-pen" @click="changeSentence(index)"/> -->
                        </p>
                    </el-scrollbar>
                    <el-scrollbar height="497px" v-if="creditContent === '2'">

                        <div class="scrollbar-item">
                            <div>
                                <a-space direction="vertical" size="mini">
                                    <span class="font-bold text-xl">
                                        标题信息
                                    </span>

                                    <div class="h-[1vh] "></div>

                                    <div>
                                        <a-input class="input-item" :max-length="50">
                                        </a-input>
                                    </div>

                                    <div class="h-[1vh] "></div>


                                    <span class="font-bold text-xl">
                                        简介信息
                                    </span>


                                    <div class="h-[1vh] "></div>

                                    <div>
                                        <a-textarea placeholder="Please enter something" class="textarea-item"
                                            :max-length="250" auto-size />
                                    </div>
                                </a-space>

                            </div>
                            <div>

                            </div>
                        </div>

                    </el-scrollbar>
                </div>

            </div>

            <a-divider direction="vertical" style="background-color: #74787c; height:auto;"></a-divider>

            <div class="flex-grow p-4" style="flex: 1;">
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

                <div class="flex justify-center items-center">
                    <video ref="videoItem" @timeupdate="updateTimeLine" class="rounded-2xl overflow-hidden"
                        style="object-fit: cover; width: 300px;">
                        <source :src="videoUrl" type="video/mp4">
                        该浏览器不支持播放视频
                    </video>
                </div>

                <div class="h-[1vh] "></div>

                <div class="flex justify-center items-center">

                    <a-button type="text" @click="lastClip" shape="circle" class="text-white text-lg" style="color: white;">
                        <template #icon>
                            <icon-backward />
                        </template>
                    </a-button>

                    <a-button type="text" v-if="!isVideoPlay" @click="playVideo" shape="circle" class="text-lg"
                        style="color: white;">
                        <template #icon>
                            <icon-play-arrow />
                        </template>
                    </a-button>

                    <a-button type="text" v-else @click="stopVideo" shape="circle" class="text-lg" style="color: white;">
                        <template #icon>
                            <icon-pause />
                        </template>
                    </a-button>

                    <a-button type="text" @click="resetVideo" shape="circle" class="text-lg" style="color: white;">
                        <template #icon>
                            <icon-record-stop />
                        </template>
                    </a-button>

                    <a-button type="text" @click="nextClip" shape="circle" class="text-lg" style="color: white;">
                        <template #icon>
                            <icon-forward />
                        </template>
                    </a-button>
                </div>

            </div>

        </div>

        <div class="mt-auto">
            <time-line ref="timeLine" :clips="clip" :totalTime="400 * 1000" @timeCursorChange="timeChange"
                @clipDurationChange="clipDurationChange">
            </time-line>
        </div>
    </div>
</template>
  
<script setup lang="ts">

import { ref, onMounted, watch, onBeforeMount } from "vue";
import { UseStore } from "@/store";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import TimeLine from "@/components/tool/TimeLine.vue";
import { client } from "@/assets/lib/request";
import { Notification } from "@arco-design/web-vue";
import { millisecondsToTimeString } from "@/assets/lib/utils"
import { nextTick } from "vue";

const store = UseStore()
const router = useRouter()
const route = useRoute()

//修改主题配色
onMounted(() => {
    store.$state.dark = true
    load()
})
//

const creditContent = ref("1")
const isVideoPlay = ref(false)
const videoItem = ref()//对video标签的引用

//获取当前任务的信息
const clips = ref<Clip[]>([])
const transcription = ref<Transcription>()
const videoTexts = ref<Sentence[]>([])
const videoUrl = ref<string>()

const load = async () => {
    //获取一个任务对应所有切片
    let resClip = await client.get<{ clips: Clip[] }>(
        { url: `task/${route.query?.task_id}/clip/` }
    )
    if (resClip.code === 114) {
        clips.value = resClip.data.clips
    } else {
        Notification.error({
            title: '获取任务信息失败',
            content: resClip.msg,
            closable: true,
            duration: 1000000,
        })
        return
    }
    // 获取一个任务的文字稿
    const resText = await client.get<{ transcription: Transcription }>(
        { url: `task/${route.query?.task_id}/transcription/` }
    )
    if (resText.code === 114) {
        transcription.value = resText.data.transcription
    } else {
        Notification.error({
            title: '获取任务信息失败',
            content: resText.msg,
            closable: true,
            duration: 1000000,
        })
        return
    }

    //获取预览视频
    const resUrl = await client.get<{ video_url }>(
        { url:`task/${route.query?.task_id}/video_url/` }
    )
    if (resUrl.code === 114) {
        console.log("resUrl",resUrl.data)
        videoUrl.value = resUrl.data.video_url
    } else {
        Notification.error({
            title: '获取预览视频失败',
            content: resUrl.msg,
            closable: true,
            duration: 1000000,
        })
        return
    }

    //渲染切片到时间轴
    for (var i = 0; i < clips.value.length; ++i) {
        const tempArray = { startTime: clips.value[i].startTime, endTime: clips.value[i].endTime }
        // clip.value[i].startTime = clips.value[i].startTime
        // clip.value[i].endTime = clips.value[i].endTime
        clip.value.push(tempArray)
    }

    //渲染视频文本
    videoTexts.value = transcription.value.sentences

    //渲染标题文案

    //渲染切片时间段
    timeLine.value.drawIt()




    console.log("video",videoUrl)
    console.log(clip.value)
    console.log(transcription.value)




}
//获取当前任务的信息

//返回任务中心
const toTaskCenter = () => {
    router.push("/task-center")
}

//右侧视频按钮相关函数
const lastClip = () => {
    videoItem.value.currentTime -= 5
}

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

const nextClip = () => {
    videoItem.value.currentTime += 5
}
//

//下一页的按钮，同时传递当前任务的task_id
const toNext = () => {
    router.push({
        path: '/task-credit-template',
        query: {
            task_id: route.query?.task_id
        }
    })
}
//

//点击sentence切换时间轴到当前句子时间
const toCurrentSentence = (currentTime: number) => {
    videoItem.value.currentTime = currentTime
}

//切换sentence为输入框
const editIndex = ref(-1)
const inputItem = ref(null)
const changeSentence = (index) => {
    editIndex.value = index
    nextTick(() => { //没效果我超？？要改
        inputItem.value.focus()
    })

}

//输入框失去焦点，保存更改信息
const loseFocus = () => {
    editIndex.value = -1
}

//时间轴相关变量和方法
const clip = ref<{ startTime: number, endTime: number }[]>([])

const timeChange = (newTime: number) => {//返回毫秒
    videoItem.value.currentTime = newTime / 1000
}

const clipDurationChange = (evt) => {
    console.log(evt)
}

//使用ref获取组件
const timeLine = ref<InstanceType<typeof TimeLine>>()

//时间轴随视频动态变化
const updateTimeLine = () => {
    timeLine.value.setTimeCursorTime(videoItem.value.currentTime * 1000)
}

//设置时间游标位置
//timeLine.value.setTimeCursorTime(200*1000)

//时间轴相关变量和方法



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
    margin: 2px;
    text-align: left;
    border-radius: 4px;
    background: #020617;
    color: white;
    padding-left: 2%;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 20px;
    width: 90%;
    position: relative
}

.scrollbar-item:hover {
    background: #0f172a;
}

.sentence-content {
    font-family: 黑体;
    font-size: 18px;
    color: #d3d7d4;
    font-weight: 500;
}

.sentence-time {
    font-size: medium;
    font-family: 'Times New Roman', Times, serif;
    color: rgb(100, 116, 139);
}

.sentence-edit {
    background-color: #0f172a;
    width: 70vh;
    // height: 3vh;
    color: #d3d7d4;
    font-size: 18px;
    border-radius: 10px;
    padding: 1%;
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
</style>
  