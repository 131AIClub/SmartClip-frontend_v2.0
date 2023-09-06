<!-- 这是任务中心卡片的.vue文件 -->
<template>
    <div class="relative" id="taskCard">

        <!-- 图片相关 -->
        <div class="cursor-pointer group">
            <!-- 状态信息 -->
            <div v-if="taskStatus === -1" class="absolute z-10 top-3 left-3">
                <el-tag round effect="dark" class="tag-item" color="#ed1941">任务出错</el-tag>
            </div>

            <div v-if="taskStatus === 0" class="absolute z-10 top-3 left-3">
                <el-tag round effect="dark" class="tag-item" color="#8a8c8e">未就绪</el-tag>
            </div>

            <div v-if="taskStatus === 1 || taskStatus === 3 || taskStatus === 4" class="absolute z-10 top-3 left-3">
                <el-tag round effect="dark" class="tag-item" color="#009ad6">未剪辑</el-tag>
            </div>

            <div v-if="taskStatus === 2 || taskStatus === 5" class="absolute z-10 top-3 left-3">
                <el-tag round effect="dark" class="tag-item" color="#e0861a">剪辑中</el-tag>
            </div>

            <div v-if="taskStatus === 6" class="absolute z-10 top-3 left-3">
                <el-tag round effect="dark" class="tag-item" color="#1d953f">已完成</el-tag>
            </div>

            <!-- 
        -1 任务出错
        0 视频还未就绪（对应图中状态“下载中”和“录制中”）
        1 未剪辑（但还没·剪辑过）
        2 剪辑中
        3 内容编辑
        4 模板编辑
        5 应用模板中
        6 制作完成 
        -->

            <div class="w-9 h-9 bg-slate-100 rounded-lg absolute z-10 top-3 right-5 
        opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-slate-200
         flex items-center justify-center" @click="toDetail">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" aria-hidden="true" class="w-5 h-5 text-black">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z">
                    </path>
                </svg>
            </div>

            <a-image class="overflow-hidden rounded-xl" :src="previewUrl" fit="cover" width="320" height="180"
                :preview="false" @click="toCredit">
            </a-image>
        </div>



        <!-- 这是视频的标题/备注信息 -->
        <el-scrollbar height="50">
            <div class="text-black text-lg cursor-pointer" id="remark" style="font-family: '黑体';" @click="toCredit">
                {{ taskRemark }}
            </div>
        </el-scrollbar>

    </div>

    <!-- 弹出框 -->
    <el-dialog v-model="detailModal" align-center :show-close="false" width="45%"
        style="--el-dialog-padding-primary: 0px; border-radius: 15px; padding-bottom: 15px; padding-top:0px;" class="">
        <div class="item-center justify-center flex">
            <a-space direction="vertical">

                <el-collapse>
                    <el-collapse-item class="collapse-item">
                        <template #title>
                            <el-icon>
                                <icon-info-circle />
                            </el-icon>
                            &nbsp;任务详情
                        </template>

                        <!--
                            任务详情要展示什么：
                            任务id
                            任务标题
                            任务状态
                            创建时间
                            任务场景
                            任务来源
                        -->

                        <div class="collapse-inner-item">
                            <div class="h-[1vh]"></div>
                            <div>
                                <el-descriptions :column="2" border>
                                    <el-descriptions-item label="任务编号">
                                        {{ taskDetail.taskId }}
                                    </el-descriptions-item>

                                    <el-descriptions-item label="任务标题">
                                        {{ taskDetail.taskRemark }}
                                    </el-descriptions-item>

                                    <el-descriptions-item label="任务状态">
                                        <el-tag size="medium" round>{{ computed_status }}</el-tag>
                                    </el-descriptions-item>

                                    <el-descriptions-item label="创建时间">
                                        {{ date(taskDetail.taskCreateTime) }}
                                    </el-descriptions-item>

                                    <el-descriptions-item label="任务场景">
                                        {{ computed_type }}
                                    </el-descriptions-item>

                                    <el-descriptions-item label="任务来源">
                                        {{ computed_source }}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>



                        </div>
                    </el-collapse-item>

                    <el-collapse-item class="collapse-item">
                        <template #title>
                            <el-icon>
                                <icon-edit />
                            </el-icon>
                            &nbsp;修改标题
                        </template>
                        <div class="collapse-inner-item2">
                            <div class="h-[1vh]"></div>
                            <a-space direction="vertical">
                                <span>
                                    原标题：{{ taskRemark }}
                                </span>
                                <div>
                                    <a-space>
                                        <span>
                                            新标题：
                                        </span>
                                        <el-input v-model="newRemark" maxlength="30" show-word-limit
                                            :placeholder="taskRemark" clearable class="input-item">
                                        </el-input>
                                    </a-space>
                                </div>

                                <div class="h-[1vh]"></div>

                                <div class="flex justify-center items-center">
                                    <a-button class="button-item" @click="changeRemark">
                                        确认修改
                                    </a-button>
                                </div>

                            </a-space>

                        </div>
                    </el-collapse-item>
                </el-collapse>

            </a-space>
        </div>


    </el-dialog>
</template>
  
<script setup lang="ts">

import { client } from "@/assets/lib/request";
import router from "@/router";
import { ref, computed } from "vue";
import { Notification } from "@arco-design/web-vue";
import { ElDescriptions } from "element-plus";
import { DateParser } from "@/assets/lib/utils";

const props = defineProps<{ taskRemark: string, taskStatus: number, task_id: number, previewUrl: string }>()

//逻辑记得写视频备注的最大文字数量信息

//点击视频进入编辑页面
const toCredit = () => {
    router.push({
        path: '/task-credit-content',
        query: {
            task_id: props.task_id
        }
    })
}
//

//获取一个任务的所有信息
const detailModal = ref(false)
const taskDetail = ref<Task>()//储存当前任务的所有信息
const toDetail = async () => {
    const res = await client.get<{ task: Task }>({ url: `task/${props.task_id}/` })
    if (res.code !== 114) {
        Notification.error({
            content: res.msg,
            closable: true,
            duration: 1000000,
        })
    }
    taskDetail.value = res.data.task

    console.log(taskDetail.value)

    detailModal.value = true
}

//将时间由long时间戳类型转为时分秒
const date = (timestamp: number) => {
    return new DateParser(timestamp).all()
}
//将时间由long时间戳类型转为时分秒

//计算属性
const computed_status = computed(() => {//任务状态
    switch (taskDetail.value.taskStatus) {
        case -1:
            return "任务出错"
        case 0:
            return "还未就绪"
        case 1:
            return "未剪辑"
        case 2:
            return "剪辑中"
        case 3:
            return "内容编辑"
        case 4:
            return "模板编辑"
        case 5:
            return "应用模板中"
        case 6:
            return "制作完成"
        default:
            return "error，请联系管理员"
    }
})

const computed_type = computed(() => {//任务场景
    switch (taskDetail.value.clipRequirement.videoType) {
        case 0:
            return "综合场景"
        case 1:
            return "直播带货"
        case 2:
            return "知识科普"
        default:
            return "error，请联系管理员"
    }
})

const computed_source = computed(() => {//任务来源
    if (taskDetail.value.videoSourceInfo.source === 2) {//url上传才有任务来源
        switch (taskDetail.value.videoSourceInfo.liveRoomRecordTask.liveRoomPlatform) {
            case 0:
                return "bilibili"
            case 1:
                return "抖音"
            case 2:
                return "快手"
            default:
                return "error，请联系管理员"
        }
    }

    return "仅当任务创建于直播录制时才显示"
})

//获取一个任务的所有信息

//修改任务标题
const newRemark = ref("")

const changeRemark = async () => {
    if (newRemark.value !== "") {
        const res = await client.post<{ task_id: number }>({
            url: `task/${props.task_id}/remark/`,
            data: { remark: newRemark.value }
        })
        if (res.code === 114) {
            Notification.success({
                content: "修改成功。"
            })
            location.reload()
        } else {
            Notification.error({
                content: res.msg,
                closable: true,
                duration: 1000000,
            })
        }
    }
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
}

.tag-item {
    // font-family: 黑体;
    // width: auto;
    color: rgb(241,245,249);
    font-weight: bold;
    height: 3vh;
    width: 7vh;
}

.button-item {
    color: black;
    font-weight: bold;
    border-radius: 20px;
    font-size: medium;
    height: 4vh;
    border: 1 solid black;
}

.button-item:hover {
    background: #e2e8f0;
    color: black
}

.collapse-item {
    width: 75vh;
    --el-collapse-header-font-size: 16px;
    font-family: '黑体';
}

.collapse-inner-item2 {
    font-size: large;
    font-family: '黑体';
    padding-left: 5%;
}

.input-item {
    width: 55vh;
    height: 4vh;
}
</style>
  