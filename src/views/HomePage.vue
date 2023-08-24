<template>
  <div>

    <!-- 背景视频 -->
    <div class="videoContainer cursor-pointer  " @click="getStarted" >
      <video class="fullscreenVideo fixed" id="bgVid" playsinline autoplay muted loop>
        <source src="/HomePage_background.mp4" type="video/mp4">
      </video>
      
    </div>

    <div class="h-[85vh] cursor-pointer" @click="getStarted"></div>
    <div class="cursor-pointer flex justify-center"   @click="getStarted">
      <span class="text-2xl  text-gray-300 fixed tracking-wider blink">— Click anywhere to get started —</span>
    </div>

  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {UseStore} from "@/store";

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
  router.push("/dashboard/choose-task")
  if(store.$state.dark === true)
    store.toggleTheme()
}

//默认主题为黑色
store.$state.dark = true
document.body.setAttribute('arco-theme', 'dark')

</script>

<style scoped>

.title{
  font-size: 70px;
  text-align: center;
  font-weight: bold;
  color: rgb(25, 127, 170);
  letter-spacing: 5px;
  font-family: "微软雅黑"
}
.describe{
  font-size: 50px;
  text-align: center;
  font-weight: bold;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.videoContainer{
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
}

@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.blink {
  animation: blink 2.5s infinite;
}

</style>