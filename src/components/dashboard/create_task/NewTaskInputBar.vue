<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, progressProps } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'

const inputAreaHeight = ref(60)
const textAreaHeight = ref(90)

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "请输入bilibili视频链接"
  },
  componentHeight: {
    type: Number,
    required: false,
    default: 230
  },
  //source 0是URL下载，1是直播录制，2是文件上传
  taskSource: {
    type: Number,
    required: true
  }
})

const inputUrl = ref("")

const emit = defineEmits(["submitUrl"])

const submitClick = () => {
  //验证URL下载
  console.log(props.taskSource)
  if (props.taskSource === 0) {
    //验证是不是b站视频
    const bilibili = /https:\/\/www\.bilibili\.com\/video\//
    if (!bilibili.test(inputUrl.value)) {
      ElMessage({
        message: "视频URL不合法！",
        type: "error"
      })
      return
    }
  }

  //验证直播录制
  if (props.taskSource === 1) {
    //验证是不是b站直播
    const bilibili_live = /^https:\/\/live\.bilibili\.com\/\d+/
    const douyin_live = /^https:\/\/live\.douyin\.com\/\d+/

    if ((!bilibili_live.test(inputUrl.value)) && (!douyin_live.test(inputUrl.value))) {
      ElMessage({
        message: "直播间链接不合法！",
        type: "error"
      })
      return
    }

    //验证是不是抖音直播
  }

  if (inputUrl.value === "") {
    ElMessage({
      message: "输入内容不能为空！",
      type: "error"
    })
    return
  }

  emit("submitUrl", inputUrl.value)
}

</script>

<template>
  <div class="component-body">
    <div class="text-area">

    </div>
    <div class="input-area">
      <input v-model="inputUrl" type="text" :placeholder="placeholder" class="input-text">

      <button @click="submitClick" class="input-button">
        <div class="input-button-text">
          创建任务
        </div>
      </button>

    </div>
  </div>
</template>

<style scoped>
.component-body {
  height: v-bind(componentHeight + 'px');
}

.text-area {
  height: v-bind(textAreaHeight + 'px');
  text-align: center;
  font-size: 100%;
}

.input-area {
  box-shadow: 0 25px 50px rgba(0, 0, 0, .25);
  height: v-bind(inputAreaHeight + 'px');
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #d0d3d7;
  position: relative;
}

.input-text {
  border: 0 solid white;
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 12px;
  font-size: 100%;
  right: 23%;
  padding-left: 1vh;
}

.input-text:focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
}

.input-text::placeholder {
  color: #9ca3b7;
  font-family: 黑体;
  font-size: medium;
}

.input-button {
  position: absolute;
  right: 12px;
  top: 8px;
  bottom: 8px;
  width: 16%;
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
</style>