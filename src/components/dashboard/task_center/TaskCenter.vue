<!-- 这是视频资源库的.vue文件 -->
<template>
    <div class="flex flex-col bg-slate-100" style=" min-height: 100vh;">


        <div class="h-[8vh]"></div>

        <!-- 下方展示视频卡片 -->
        <div>

            <div class="card-item">
                <a-grid :cols="3">
                    <!-- <task-card v-for="(task, index) in tasks" :key="index" :task-remark="task.taskRemark"
                        :task-status="task.taskStatus" /> -->

                    <!-- 此处写单独卡片，然后用v-for遍历 -->
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>
                    <div>
                        <task-card />
                        <div class="h-[5vh]"></div>
                    </div>

                </a-grid>
            </div>

        </div>

        <div class="flex justify-center ">
            <a-pagination :total="50" @change="pageChange" size="large" />
        </div>

        <div class="h-[8vh]"></div>

    </div>
</template>
    
<script setup lang="ts">
import { client } from "@/assets/lib/request";
import { ref, reactive, watch, onMounted } from "vue";
import { DateParser } from "@/assets/lib/utils";
import { TableData } from "@arco-design/web-vue"
import { UseStore } from "@/store";
import { Notification, RequestOption, UploadRequest } from '@arco-design/web-vue';
import axios, { Canceler } from "axios"

const store = UseStore()
store.loading = true

//修改主题配色
onMounted(() => {
    store.$state.dark = false
})
//

const page = ref(0)
const loading = ref(false)

const tasks = ref<Task[]>([])
const total = ref<number>()
const pageSize = ref<number>(9)//每页展示九个任务
// const source = ref(-1)
// const load = async () => {
//     const res = await client.get<{ tasks: Task[], total: number }>(
//         { url: `task/?page_count=${pageSize.value}&page_num=${page.value}` }
//     )
//     if (res.code === 114) {
//         total.value = res.data.total
//         tasks.value = res.data.tasks


//     }
//     else {
//         Notification.error({
//             title: '获取任务信息失败',
//             content: res.msg,
//             closable: true,
//             duration: 1000000,
//         })
//     }
// }


const pageChange = async (newPage: number) => {
    //！！！！！！！！！！正式使用记得打开
    // page.value = newPage - 1
    // loading.value = true
    // await load()
    // loading.value = false
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
    