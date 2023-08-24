<!-- 这是创建直播推流任务的.vue文件 -->
<template>
    <div class="flex flex-col gap-2 md:gap-4">
        <a-card title="创建直播推流任务" hoverable>
            <a-button type="outline" @click="router.push('/dashboard/choose-task')">
                <template #icon>
                    <icon-left />
                </template>
                返回
            </a-button>
            <div class="flex justify-center items-center">

                <a-form :model="taskLive" class="w-[96%] max-w-[640px] p-2" layout="vertical">
                    <a-form-item label="平台类型" required>
                        <a-radio-group v-model="taskLive.liveRoomInfo.platform">
                            <a-radio :value=0>
                                <template #radio="{ checked }">
                                    <a-space align="start" class="custom-radio-card"
                                        :class="{ 'custom-radio-card-checked': checked }">
                                        <div className="custom-radio-card-mask">
                                            <div className="custom-radio-card-mask-dot" />
                                        </div>
                                        <div>
                                            <div className="custom-radio-card-title">
                                                哔哩哔哩动画
                                            </div>
                                        </div>
                                    </a-space>
                                </template>
                            </a-radio>

                            <a-radio :value=1>
                                <template #radio="{ checked }">
                                    <a-space align="start" class="custom-radio-card"
                                        :class="{ 'custom-radio-card-checked': checked }">
                                        <div className="custom-radio-card-mask">
                                            <div className="custom-radio-card-mask-dot" />
                                        </div>
                                        <div>
                                            <div className="custom-radio-card-title">
                                                抖音
                                            </div>
                                        </div>
                                    </a-space>
                                </template>
                            </a-radio>

                            <div class="h-[20vh] md:h-[2.5vh]"></div>

                            <a-radio :value=2>
                                <template #radio="{ checked }">
                                    <a-space align="start" class="custom-radio-card"
                                        :class="{ 'custom-radio-card-checked': checked }">
                                        <div className="custom-radio-card-mask">
                                            <div className="custom-radio-card-mask-dot" />
                                        </div>
                                        <div>
                                            <div className="custom-radio-card-title">
                                                快手
                                            </div>
                                        </div>
                                    </a-space>
                                </template>
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <!-- <div class="h-[20vh] md:h-[2.5vh]"></div> -->

                    <a-form-item label="直播间网址" required tooltip="请与所选平台类型保持对应">
                        <a-input v-model="liveRoomUrl" :style="{ width: '600px' }"
                            style="border: 1px solid var(--color-border-4);" placeholder="请输入直播间网址" size="large"
                            allow-clear>
                            <template #prefix>
                                <icon-link />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item label="录制开始时间" required>
                        <a-date-picker v-model="taskLive.recordStartTime" style="width: 300px; margin: 0 6px 6px 0;"
                            show-time format="YYYY-MM-DD hh:mm" value-format="timestamp" @change="" @select="" @ok="" />
                    </a-form-item>


                    <a-form-item label="录制结束时间" required>
                        <a-date-picker v-model="taskLive.recordEndTime" style="width: 300px; margin: 0 6px 6px 0;" show-time
                            format="YYYY-MM-DD hh:mm" value-format="timestamp" @change="" @select="" @ok="" />
                    </a-form-item>

                    <a-form-item label="任务备注">
                        <a-textarea v-model="taskLive.remark" style=" border: 1px solid var(--color-border-4);"
                            placeholder="描述对直播推流任务的其他备注信息" allow-clear />
                    </a-form-item>

                    <div class="h-[20vh] md:h-[2.5vh]"></div>

                    <div class="flex justify-end items-center gap-4">
                        <a-button type="primary" status="success" @click="save" :disabled="!isOk">
                            创建任务
                        </a-button>
                    </div>
                </a-form>

                <!-- 测试用的 -->
                <!-- <button @click="showId">点我在控制台查看直播间id(测试用)</button> -->

                <!-- <a-alert type="error">
                    <template #title>
                        Error
                    </template>
                    This is an error alert.
                </a-alert> -->

            </div>

        </a-card>

    </div>
</template>
    
<script setup lang="ts">
// import {UseStore} from "@/store";
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";
import { client } from "@/assets/lib/request";
import { Notification } from "@arco-design/web-vue"
import { ElMessage } from 'element-plus'
const router = useRouter()

const taskLive = ref<TaskLive>({
    taskId: -1,
    taskStatus: 0,
    recordStartTime: 0,
    recordEndTime: 0,
    liveRoomInfo: {
        platform: 0,
        live_room_id: ''
    },
    remark: '',
    errorMessage: '',
    taskCreateTime: 0
})

//由直播间网址转换到对应直播间id
const liveRoomUrl = ref('')
const currentId = computed(() => {
    if (taskLive.value.liveRoomInfo.platform === 0)//bilibili
    {
        const pattern = /\/(\d+)\?/; // 正则表达式模式
        const match = liveRoomUrl.value.match(pattern); // 使用正则表达式匹配

        if (match && match[1])
            return match[1];
        else
            return ""
    }
    else if (taskLive.value.liveRoomInfo.platform === 1)//抖音
    {
        const pattern = /\/(\d+)/; // 正则表达式模式
        const match = liveRoomUrl.value.match(pattern); // 使用正则表达式匹配

        if (match && match[1])
            return match[1];
        else
            return ""

    }
    else if (taskLive.value.liveRoomInfo.platform === 2)//快手
    {
        const pattern = /\/u\/(\w+)/; // 正则表达式模式
        const match = liveRoomUrl.value.match(pattern); // 使用正则表达式匹配

        if (match && match[1])
            return match[1];
        else
            return ""
    }
})

watch(currentId, (newValue) => {
    if (newValue)
        taskLive.value.liveRoomInfo.live_room_id = newValue
    else
        taskLive.value.liveRoomInfo.live_room_id = ""
})
//

//判断是否填写完必要信息
const isOk = computed(() => {
    if (taskLive.value.recordStartTime &&
        taskLive.value.recordEndTime &&
        taskLive.value.liveRoomInfo.platform !== -1 &&
        taskLive.value.liveRoomInfo.live_room_id)
        return true;
    else
        return false;
})
//

//提交任务
const save = async () => {
    if (taskLive.value.recordStartTime < Date.now()) {
        ElMessage({
            showClose: true,
            message: '开始时间必须晚于当前时间。',
            type: 'error',
        })
        return
    }

    if (taskLive.value.recordEndTime <= taskLive.value.recordStartTime) {
        ElMessage({
            showClose: true,
            message: '结束时间必须晚于开始时间。',
            type: 'error',
        })
        return
    }

    const res = await client.post<{ taskId: number }>({
        url: "live_record_task/",
        data: { task: taskLive.value }
    })
    if (res.code === 2100) 
    {
        Notification.success("创建成功")
        await router.push(`/dashboard/task-live/${res.data.taskId}`)
    } 
    else 
    {
        //出错的提示，会保留很久，逻辑是点击关闭按钮，页面会进行刷新
        Notification.error({
            title: 'Notification',
            content: `${res.msg}`,
            closable: true,
            duration: 1000000,
            onClose: () => {
                window.location.reload()
            }
        })
    }
}
//

</script>
    
<style scoped lang="less">
.custom-radio-card {
    padding: 10px 16px;
    border: 1px solid var(--color-border-4);
    border-radius: 4px;
    width: 250px;
    box-sizing: border-box;
}

.custom-radio-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
}

.custom-radio-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
}

.custom-radio-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
    border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
    background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
    color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
    background-color: rgb(var(--primary-6));
}
</style>
    