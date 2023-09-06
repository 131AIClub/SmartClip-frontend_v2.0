<script setup lang="ts">

import { client } from "@/assets/lib/request";
import { ref } from "vue";
import { Notification, RequestOption, UploadRequest } from '@arco-design/web-vue';
import { ElIcon, ElMessage, TabsPaneContext } from "element-plus";

const props = defineProps({
  needSelectTime: {
    type: Boolean,
    required: false,
    default: false
  },
  inputData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["submit"])

const maxClipNum = ref(8)

const selectedDateTime = ref([
  new Date(),
  new Date(new Date().getTime() + 3600 * 1000)
])

const selectedVideoType = ref(0)

//判断url来自网址类型，并读取id
const liveRoomPlatform = ref<number>()
const liveRoomId = ref<string>()
const judgeUrl = (url: string) => {
  //bilibili
  const bilibili = /^https:\/\/live\.bilibili\.com\/\d+/
  const bilibili_match = /^https:\/\/live\.bilibili\.com\/(\d+)/

  if (bilibili.test(url)) {
    liveRoomPlatform.value = 0
    liveRoomId.value = url.match(bilibili_match)[1]
    return
  }

  //抖音
  const douyin = /^https:\/\/live\.douyin\.com\/\d+/
  const douyin_match = /^https:\/\/live\.douyin\.com\/(\d+)/

  if (douyin.test(url)) {
    liveRoomPlatform.value = 1
    liveRoomId.value = url.match(douyin_match)[1]
    return
  }

  //快手（暂不支持）
}

const buttonLoading = ref(false)

const submitClick = async () => {
  let result = {
    inputData: props.inputData,
    videoType: selectedVideoType.value,
    startTime: selectedDateTime.value[0].getTime(),
    endTime: selectedDateTime.value[1].getTime(),
    maxClipNum: maxClipNum.value
  }

  let inputData = result["inputData"]
  let source = inputData["source"]
  result["source"] = source

  const currentTime = Date.now()

  //判断结束时间要大于当前时间
  if (result.endTime <= currentTime) {
    ElMessage({
      type: "error",
      message: "结束时间必须晚于当前时间！",
      center: true,
      duration: 1000
    })
    return
  }

  //判断结束时间要大于开始时间
  if (result.endTime <= result.startTime) {
    ElMessage({
      type: "error",
      message: "结束时间必须晚于开始时间！",
      center: true,
      duration: 1000
    })
    return
  }

  //判断结束时间减开始时间要小于12小时
  const timeDifference = result.endTime - result.startTime
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference > 12) {
    ElMessage({
      type: "error",
      message: "录制时间段请小于12小时！",
      center: true,
      duration: 1000
    })
    return
  }


  //设置创建任务加载状态
  buttonLoading.value = true

  ElMessage({
    type: "success",
    message: "任务创建中，请稍候...",
    center: true,
    duration: 2000
  })



  if (source == 2) {
    //Has file
    result["video"] = inputData["content"]
  } else {
    //Only url
    result["url"] = inputData["content"]
  }

  //发送请求！---------------------------------------------

  //定义post请求的变量clipRequirement
  const clipRequirement = ref<ClipRequirement>({
    videoType: result.videoType,
    maxClipNum: result.maxClipNum
  })

  let res

  if (result["source"] === 0) { // url下载

    res = await client.post<{ taskId: number }>({
      url: "task/from_url/",
      data: { videoUrl: result["url"], clipRequirement: clipRequirement.value }
    })

  } else if (result["source"] === 1) { // 直播录制
    judgeUrl(result["url"])

    //定义post请求的变量liveRoomRecordTask
    const liveRoomRecordTask = ref<LiveRoomRecordTask>({
      liveRoomPlatform: liveRoomPlatform.value,
      liveRoomId: liveRoomId.value,
      recordStartTime: result.startTime,
      recordEndTime: result.endTime
    })

    res = await client.post<{ taskId: number }>({
      url: "task/from_live_record/",
      data: {
        liveRoomRecordTask: liveRoomRecordTask.value,
        clipRequirement: clipRequirement.value
      }
    })


  } else { // 文件上传
    const form = new FormData()
    form.append("video", result["video"])
    form.append("remark", result["video"].name)
    form.append("videoType", String(result.videoType))
    form.append("maxClipNum", String(result.maxClipNum))

    res = await client.post<{ taskId: number }>({
      url: "task/from_video/",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    })
  }

  emit("submit", res)
}

</script>

<template>
  <div class="component-body">
    <div class="select-video-type">
      <h5 style="font-size: 1.5rem; top: 0; margin: 0; color: black ;font-family: 黑体; font-weight: bold;">
        请选择视频类型
      </h5>

      <div style="display: flex;justify-content: center; margin-top: 20px;margin-bottom: 20px">
        <div class="img-and-text-div" :class="{ 'img-and-text-div-selected': (selectedVideoType === 0) }">
          <img draggable="false" :src="'/demo.jpeg'" @click="selectedVideoType = 0" />
          <span style="color: black;font-weight: bold">综合场景</span>
        </div>

        <div class="img-and-text-div" :class="{ 'img-and-text-div-selected': (selectedVideoType === 1) }">
          <img draggable="false" :src="'/demo.jpeg'" @click="selectedVideoType = 1" />
          <span style="color: black;font-weight: bold">直播带货</span>
        </div>

        <div class="img-and-text-div" :class="{ 'img-and-text-div-selected': (selectedVideoType === 2) }">
          <img draggable="false" :src="'/demo.jpeg'" @click="selectedVideoType = 2" />
          <span style="color: black;font-weight: bold">知识科普</span>
        </div>

      </div>
    </div>

    <div v-if="needSelectTime" class="select-record-time">
      <div class="h-[1vh]"></div>
      <h5 style="font-size: 1.5rem; top: 0; margin: 0; color: black; font-family: 黑体; font-weight: bold;">
        请选择录制时间
      </h5>

      <div style="margin: 20px">
        <a-space direction="vertical">
          <el-date-picker v-model="selectedDateTime" type="datetimerange" range-separator="到" start-placeholder="录制开始时间"
            end-placeholder="录制结束时间" />
          <a-space>
            <icon-info-circle />
            <span>时间段请控制在12小时以内~</span>
          </a-space>

        </a-space>

      </div>
    </div>

    <div class="h-[1vh]"></div>

    <div class="advanced-settings">
      <el-collapse>
        <el-collapse-item class="collapse-item">
          <template #title>
            <el-icon>
              <icon-edit />
            </el-icon>
            &nbsp;高级设置（可选）
          </template>
          <div>
            <a-space>
              <span class="advance-setting-text">
                最大切片数量：
              </span>
              <el-input-number v-model="maxClipNum" :min="1" :max="50" />
            </a-space>

          </div>
        </el-collapse-item>
      </el-collapse>

    </div>

    <div class="confirm-button-div">
      <el-button @click="submitClick" class="input-button" :loading="buttonLoading">
        <div class="input-button-text">
          创建任务
        </div>
      </el-button>
    </div>

  </div>
</template>

<style scoped>
hr {
  background-color: #e5e7eb;
  height: 1px;
  border: none;
}

.component-body {
  padding-left: 20px;
  padding-right: 20px;
}

.img-and-text-div {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid #ccd0d7;
  border-radius: 10px;
}

.img-and-text-div-selected {
  border: 1.5px solid black;
}

.select-video-type img {
  height: 144px;
  border-radius: 12px;
}

.select-record-time {
  margin-top: 20px;
  margin-bottom: 20px;
}

.confirm-button-div {
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  text-align: right;
}

.input-button {
  position: relative;
  width: 20%;
  height: 40px;
  border-radius: 15px;
  background-color: black;
}

.input-button-text {
  position: absolute;
  color: white;
  font-size: 100%;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: bold;
}

.advance-setting-text {
  font-size: large;
}

.collapse-item {
  --el-collapse-header-font-size: 16px;
  font-family: '黑体';
}
</style>