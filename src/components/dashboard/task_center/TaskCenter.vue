<!-- 这是视频资源库的.vue文件 -->
<template>
    <div class="flex flex-col bg-slate-100" style=" min-height: 100vh;">

        <div class="h-[8vh]"></div>

        <!-- 下方展示视频卡片 -->
        <div>

            <div class="card-item">
                <a-grid :cols="3" :col-gap="20">
                    <!-- <task-card v-for="(task, index) in tasks" :key="index" :task-remark="task.taskRemark"
                        :task-status="task.taskStatus" /> -->

                    <!-- 此处写单独卡片，然后用v-for遍历 -->
                    <div v-for="task in tasks" :key="task.taskId" >
                        <task-card :task-remark="task.taskRemark" :task-status="task.taskStatus" 
                        :task_id="task.taskId" :preview-url="task.previewUrl"/>
                        <div class="h-[3vh]"></div>
                    </div>

                </a-grid>
            </div>

        </div>

        <div class="flex justify-center ">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :pager-count="6" background
                class="bg-slate-100" v-model:current-page="realPage" @update:current-page="pageChange" />
        </div>

        <div class="h-[8vh]"></div>

    </div>
</template>
    
<script setup lang="ts">
import { client } from "@/assets/lib/request";
import { ref, onMounted } from "vue";
import { UseStore } from "@/store";
import { Notification, RequestOption, UploadRequest } from '@arco-design/web-vue';

const store = UseStore()
store.loading = true

//修改主题配色
onMounted(() => {
    store.$state.dark = false
})
//

const pageToBackEnd = ref(0)
const realPage = ref(1)
const loading = ref(false)

const tasks = ref<Task[]>([])
const total = ref<number>()
const pageSize = ref<number>(9)//每页展示九个任务
const load = async () => {
    const res = await client.get<{ tasks: Task[], total: number }>(
        { url: `task/?pageCount=${pageSize.value}&pageNum=${pageToBackEnd.value}` }
    )
    if (res.code === 114) {
        total.value = res.data.total
        tasks.value = res.data.tasks
    }
    else {
        Notification.error({
            title: '获取任务信息失败',
            content: res.msg,
            closable: true,
            duration: 1000000,
        })
    }
}

//页面发生更改
const pageChange = () => {
    pageToBackEnd.value = realPage.value - 1
    loading.value = true
    // await load()
    loading.value = false
}
//

// await load()
store.loading = false


</script>
    
<style  lang="less">
.card-item {
    padding-left: 20%;
    padding-right: 20%;
}
</style>
    