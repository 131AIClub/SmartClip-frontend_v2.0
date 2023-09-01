<script setup lang="ts">
import {computed, ref} from "vue"

//整个组件的高度
const componentHeight=ref(150)
//显示时间区域的高度
const timeAreaHeight=ref(32)
//操作区的高度
const operateAreaHeight=computed(()=> componentHeight.value - timeAreaHeight.value)

//缩放大小，即每个小单位多长时间，单位为毫秒
const scale=ref(1000)
const totalTime=ref(1000*1000)

//最多可以选到多少个单位
const maxValidUnitNum=computed(()=> Math.ceil(totalTime.value / scale.value))
//总共要画多少个小单位
const unitNumToDraw=computed(()=> maxValidUnitNum.value + 10)

//一个小单位有多少像素，这里默认设置成10
const timeUnitWidth=ref(10)

//页面的总宽度（数值类型的和用在css上的）
const pageWidth=computed(()=> timeUnitWidth.value * (unitNumToDraw.value + 1))

//最大的有效的x值
const maxValidX=computed(()=> (maxValidUnitNum.value + 1) * timeUnitWidth.value)

//当前时间游标是否处在拖动模式
const dragMode=ref(false)
//当前时间游标的x偏移量
const cursorX=ref(timeUnitWidth.value)

//时间轴滚动条的偏移量
const scrollOffset=ref(0)

//测试用的切片信息
const clips=ref([
  {
    "startTime":5,
    "endTime":10
  }
])

class DraggableCursor{
  xOffset:number

}

const clipCursorXArray=computed(()=>{
  let result=[]
  for(let i=0;i<clips.value.length;i++){
    let clip=clips[i]

  }
})

//TODO scale的时候同时设置每个可拖动元素的新的位置（包括时间游标）

//处理拖动事件
let currentDragX=cursorX

const cursorMouseDown=(evt:MouseEvent)=>{
  //TODO 更改currentDragX指向（根据evt来识别是哪个DraggableCursor）
  dragMode.value=true
}

const cursorMouseUp=()=>{
  dragMode.value=false
}

const cursorMouseMove=(evt:MouseEvent)=>{
  if(dragMode.value){
    let newX : number = evt.clientX + scrollOffset.value
    if(newX < timeUnitWidth.value || newX > maxValidX.value){
      //左右越界
      dragMode.value=false
    }else if(evt.offsetY < 5 || evt.offsetY > operateAreaHeight.value - 5){
      //上下越界
      dragMode.value=false
    }else{
      currentDragX.value=evt.clientX + scrollOffset.value
    }
  }
}

//滚动条滚动时的事件
const scrollMove=(evt: {scrollLeft: number, scrollTop: number})=>{
  scrollOffset.value = evt.scrollLeft
}

//获取当前时间游标的时间
const currentTime=computed(()=> ((cursorX.value / timeUnitWidth.value) - 1) * (scale.value / 1000))

//阻止默认拖拽事件（防止禁止拖拽图标）
const preventDragEvent=(evt:DragEvent)=>{
  evt.preventDefault()
  evt.stopPropagation()
}

//只针对时间游标的改变，点击时间轴改变时间游标位置
const timeAreaInteract=(evt:PointerEvent)=>{
  let newX : number = evt.clientX + scrollOffset.value
  if(newX < timeUnitWidth.value){
    cursorX.value = timeUnitWidth.value
  }else if(newX > maxValidX.value){
    cursorX.value = maxValidX.value
  }else{
    cursorX.value=evt.clientX + scrollOffset.value
  }
}

</script>

<template>

<div class="mt-auto border-t border-slate-700"></div>

  <!-- <span style="position:static;">这是 {{currentTime}}</span> -->

    <el-scrollbar @scroll="scrollMove">
      <div style="position: relative; height: 150px">
        <div class="time-area">
          <!--    这里展示时间轴-->

          <div v-for="(n,i) in unitNumToDraw">
            <!--      大刻度-->
            <div class="no-select-text" v-if="i % 10 == 0" :style="{left: (i+1)*10 + 'px'}" style="color: rgba(255, 255, 255, 0.6);position: absolute;font-size: 12px;top: 0">
              {{i * (scale / 1000)}}
            </div>
            <div v-if="i % 10 == 0"  :style="{left: (i+1)*10 + 'px'}" class="timeline-unit" style="height: 16px; position: absolute; top: 16px; width: 10px;" />
            <!--        小刻度-->
            <div v-if="i % 10 != 0" :style="{left: (i+1)*10 + 'px'}" class="timeline-unit" style="height: 8px; position: absolute; top: 24px; width: 10px;" />
          </div>
        </div>

        <div class="time-area-interact"  @click="timeAreaInteract">
          <!--    时间轴的交互区域-->
        </div>

        <div class="time-edit-lower-part" draggable="false"
             @dragenter="preventDragEvent"
             @dragstart="preventDragEvent"
             @dragover="preventDragEvent"
             @mouseup="cursorMouseUp" @mousemove="cursorMouseMove" >
          <!--    这里展示高亮片段-->

          <div class="time-line-highlight-area" style="left: 50px; width: 60px;
           height: 30%; top: 20%; position: absolute;background-color: #6b21a8">
            <div class="highlight-left-bracket" style="background-color: #a855f7; left: 0;
             width: 4px; height: 100%; border-radius: 4px; position: absolute"></div>
            <div class="highlight-right-bracket" style="background-color: #a855f7;left: calc(100% - 4px); top: 0;
             width: 4px; height: 100%; border-radius: 4px; position: absolute"></div>
          </div>
        </div>

        <div class="time-edit-cursor" draggable="false" :style="{left:cursorX + 'px'}">
          <svg class="cursor-top" width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M0 1C0 0.447715 0.447715 0 1 0H7C7.55228 0 8 0.447715 8 1V9.38197C8 9.76074 7.786 10.107 7.44721 10.2764L4.44721 11.7764C4.16569 11.9172 3.83431 11.9172 3.55279 11.7764L0.552786 10.2764C0.214002 10.107 0 9.76074 0 9.38197V1Z" fill="#5297FF">
            </path>
          </svg>

          <div class="cursor-area" draggable="false" @drag="(evt:DragEvent)=>{evt.preventDefault()}"
               @mouseup="cursorMouseUp" @mousedown="cursorMouseDown" @mousemove="cursorMouseMove">

          </div>
        </div>
      </div>
    </el-scrollbar>
</template>

<style scoped>

.no-select-text {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.timeline-unit{
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: content-box;
  height: 4px;
  width: 10px;
  position: absolute;
  bottom: 0;
  top: auto;
}

.time-area{
  height: v-bind(timeAreaHeight + 'px');
  background-color: #020617;
  width: v-bind(pageWidth + 'px');
}

.time-area-interact{
  height: v-bind(timeAreaHeight + 'px');
  width: v-bind(pageWidth + 'px');
  position: absolute;
  top: 0;
}

.time-edit-lower-part{
  background-color: #020617;
  position: relative;
  top: 0;
  height: v-bind(operateAreaHeight + 'px');
  width: v-bind(pageWidth + 'px');
  z-index: 99;
}

.time-edit-cursor{
  width: 1px;
  position: absolute;
  border-left: 1px solid #5297FF;
  border-right: 1px solid #5297FF;
  transform: translateX(-25%) scaleX(0.5);
  top: 32px;
  cursor: ew-resize;
  box-sizing: border-box;
  height: v-bind(operateAreaHeight + 'px');
  z-index: 999;
}

.cursor-top{
  transform: translate(-50%, 0) scaleX(2);
}

.cursor-area{
  width: 32px;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: v-bind(operateAreaHeight + 'px')
}
</style>