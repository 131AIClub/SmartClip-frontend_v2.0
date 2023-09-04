<!-- vue项目创建模板 -->
<template>
    <div class="relative" id="taskCard">

        <!-- 状态信息 -->
        <div :class="videoStates"></div>
        <!-- <div class="w-7 h-7 bg-green-500 rounded-full absolute z-10 top-3 left-3"></div> -->

        <!-- 
        -1 任务出错
        -1 任务出错
        0 视频还未就绪（对应图中状态“下载中”和“录制中”）
        1 未剪辑（但还没·剪辑过）
        2 剪辑中
        3 内容编辑
        4 模板编辑
        5 应用模板中
        6 制作完成 
        -->

        <a-image class=" overflow-hidden rounded-xl cursor-pointer" src="/test.png" fit="cover" width="320" height="180" 
        :preview="false"
        @click="toCredit">

            <!-- <template #extra>
                <div class="actions">
                    <span class="action cursor-pointer" @click="watchVideo(rowIndex)"><icon-eye /></span>

                    <a-divider direction="vertical" />

                    <span class="action cursor-pointer" @click="downloadImage(rowIndex)"><icon-download /></span>
                </div>
            </template> -->
        </a-image>

        <!-- 这是视频的标题/备注信息 -->
        <!-- <div class="font-bold text-black text-lg " id="remark">{{props.taskRemark}}</div> -->
        <div class="text-black text-lg cursor-pointer" id="remark" style="font-family: '黑体';" @click="toCredit"> 这是一个标题！ </div>

    </div>
</template>
  
<script setup lang="ts">

import router from "@/router";
import { ref,computed } from "vue"

const props = defineProps<{ taskRemark:string,taskStatus:number,task_id:string }>()

// const videoStates = ref('w-7 h-7 bg-red-600 rounded-full absolute z-10 top-3 left-3')

const videoStates = computed(() => {
    let classInfo = 'w-7 h-7 bg-'
    const currentState = Number(1)//这里要改成传过来的状态信息
    switch(currentState){
        case -1://任务出错
            classInfo+="red-600"
            break
        case 0://视频还未就绪
            classInfo+="gray-300"
            break
        case 1://未剪辑、内容编辑、模板编辑
        case 3:
        case 4:
            classInfo+="blue-400"
            break
        case 2://剪辑中、应用模板中
        case 5:
            classInfo+="yellow-400"
            break
        case 6://制作完成
            classInfo+="green-500"
            break
    }

    classInfo+=" rounded-full absolute z-10 top-3 left-3"

    return classInfo
})

//逻辑记得写视频备注的最大文字数量信息

//点击视频进入编辑页面
const toCredit = () => {
    router.push({
        path:'/task-credit-content',
        query:{
            task_id:props.task_id
        }
    })
}
//

</script>

<style scoped lang="less">
.circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: yellow;
    border-radius: 50%;
}

#remark {
    width: 320px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    /*这个参数根据需求来决定要不要*/

    #taskCard {
        max-height: 3px;
    }

}
</style>
  