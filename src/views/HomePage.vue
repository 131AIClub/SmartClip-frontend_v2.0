<template >
  <div class="flex justify-center items-center h-screen bg-black ">


    <!-- 背景视频 -->
    <!-- <div class="cursor-pointer  " @click="getStarted" >
      <video class="fullscreenVideo fixed" id="bgVid" playsinline autoplay muted loop>
        <source src="/HomePage_background.mp4" type="video/mp4">
      </video>
    
    </div> -->

    <!-- <div class="h-[85vh] cursor-pointer" @click="getStarted"></div>
    <div class="cursor-pointer flex justify-center"   @click="getStarted">
      <span class="text-2xl  text-gray-300 fixed tracking-wider blink">— Click anywhere to get started —</span>
    </div> -->

    <a-space direction="vertical" fill align="center">
      <div class="rounded-xl bg-white p-2 inline-flex text-gray-600 h-15 ">
        AI powered by
        <img src="/openAI_logo.svg" alt="Image" class="w-20  ml-2">
      </div>

      <div class="h-[2.5vh]"></div>

      <!-- 大标题 -->
      <!-- <div class="text-7xl font-bold ">一站式视频剪辑、编辑、投放平台</div> -->
      <div class="text-7xl font-bold">
        <span class="text-white">
          一站式视频
        </span>
        <span class="text-pink-500">
          剪辑、编辑、投放
        </span>
        <span class="text-white">
        平台
        </span>
      </div>


      <div class="h-[2.5vh]"></div>

      <div class="text-xl text-gray-300">在下方链接中输入你的视频URL，即可获取对应切片并在抖音/tiktok一键投放</div>

      <div class="h-[2.5vh]"></div>

      <!-- 输入URL，或者点击使用在这里 -->
      <div>
        <el-input v-model="store.$state.video_URL" placeholder="输入你的视频URL" class="input-with-select"
          style="width: 800px;height: 50px;" size="large">
          <!-- <template #prepend>
            <el-select v-model="store.$state.video_info.video_platform" placeholder="选择平台" style="width: 120px;">
              <el-option label="哔哩哔哩动画" value="1" />
              <el-option label="抖音" value="2" />
              <el-option label="tiktok" value="3" />
            </el-select>
          </template> -->
          <template #append>
            <el-button style="width: 120px;" class=" text-black font-bold" @click="getStarted">一键使用</el-button>
          </template>
        </el-input>
      </div>

      <div class="text-gray-300 ">免费使用（初次注册赠送20点积分）</div>


      <div class="h-[5vh] "></div>

      <div class="text-2xl font-bold">投放渠道支持</div>

      <div class="h-[1vh] "></div>

      <!-- 这里可以展示四个图标 -->
      <div>
        <a-space>
          <icon-tiktok-color style="font-size: 64;" />
          <a-divider direction="vertical" />
          <icon-xigua-color style="font-size: 64;" />
          <a-divider direction="vertical" />
          <icon-lark-color style="font-size: 64;" />
          <a-divider direction="vertical" />
          <icon-bytedance-color style="font-size: 64;" />
        </a-space>
      </div>

      <div class="h-[5vh] "></div>

      <div class="text-5xl font-bold">
        <span class="text-pink-500">
          114514 clips generated
        </span>
        <span class="text-white">
          by 100+ creators！
        </span>

      </div>



    </a-space>

    <div class="h-[5vh] "></div>

      <!--test-->
        <!-- <time-line-canvas></time-line-canvas> -->
      <!--test-->

  </div>

  <div>
    
    <div class="h-[5vh] "></div>
  </div>

</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import { UseStore } from "@/store";
import { ElMessage } from 'element-plus'
import { ref, onUnmounted, onMounted } from 'vue'

//test
// import TimeLineCanvas from "../components/tool/timeline-canvas.vue";
//

const router = useRouter()
const store = UseStore()


//主页图片
// const images = ref([
//   { src: '/HomePage1.jpg'},
//   { src: '/HomePage2.jpg'},
//   { src: '/HomePage3.jpg'},
//   { src: '/HomePage4.jpg'},
// ])

const getStarted = () => {
  if (!store.$state.is_login) {
    ElMessage({
      type: "error",
      message: "请先登录！",
      center: true
    })
    return
  }

  router.push("/dashboard/choose-task")
  // if (store.$state.dark === true)
  //   store.toggleTheme()
}

//默认主题为黑色
// store.$state.dark = true
document.body.setAttribute('arco-theme', 'dark')

</script>

<style >
/* .videoContainer{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}

.videoContainer:before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25,29,34,.65);
} */

/* @keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.blink {
  animation: blink 2.5s infinite;
} */

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

</style>