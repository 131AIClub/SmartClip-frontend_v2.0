<!-- 这是直播推流任务的.vue文件 还很简陋捏 -->
<template>
  <div class="flex flex-col gap-2 md:gap-4 w-[96%] max-w-[960px] m-auto">
    <!-- <a-card title="任务进度" hoverable class="hidden md:block">
      <a-steps :current="data.task.taskStatus+1||3"  :status="state" type="navigation">
        <a-step>草稿</a-step>
        <a-step>切片</a-step>
        <a-step>编辑</a-step>
        <a-step>投放</a-step>
      </a-steps>
    </a-card> -->

    <a-card title="任务详情" hoverable>
      <div class="md:px-4">
        <a-descriptions :data="base_info" title="基础信息" :column="1" bordered/>
        <br>
        <!-- <a-descriptions :data="clip_info" title="剪辑需求" :column="{xs:1, lg:2}" bordered/>
        <br> -->

        <!-- 剪辑进度 -->
        <!-- <div v-if="progress_info.length">
          <span class="text-xs lg:text-base text-black">剪辑进度</span>
          <a-button status="success" type="primary" @click="updateProgress" class="ml-5" size="small">
            更新剪辑进度
          </a-button>
          <div class="h-[1vh]"></div>
          <hr>
          <div class="frame-body">
            <div class="frame-aside">
              <a-steps :current="progress.data.progress.stage+1" direction="vertical" type="dot" status="process">
                <a-step>解析原视频</a-step>
                <a-step>生成剪辑点</a-step>
                <a-step>剪辑原视频</a-step>
              </a-steps>
            </div>
            <div class="frame-main">
              <div class="main-content">
                  <a-descriptions :data="progress_info" :column="{xs:1, lg:1}" bordered size="large"/>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <!-- <div v-if="data.task.taskStatus==0" class="pt-4 flex justify-center">
        <a-button status="success" @click="router.push(`/dashboard/create-task/${data.task.taskId}`)">
          继续编辑
        </a-button>
      </div> -->
      <!-- <div v-if="data.task.taskStatus==1" class="pt-4 flex justify-center">
        <a-button status="success" @click="updateProgress">
          更新剪辑进度
        </a-button>
      </div> -->

      <!-- <div v-if="data.task.taskStatus==-1" class="pt-4 flex justify-center">
        <a-popconfirm content="确定要重启当前任务吗？" type="warning" @ok="restart">
          <a-button status="danger">
            重试当前剪辑任务
          </a-button>
        </a-popconfirm> 
      </div> -->
    </a-card>


    <!-- <a-card title="原始视频" hoverable v-if="video_url">
      <div class="flex justify-center items-center">
        <video class="max-h-[80vh]" controls>
          <source :src="video_url" type="video/mp4">
        </video>
      </div>
    </a-card>

    <suspense>
      <clip-result-card :task_id="data.task.taskId"/>
      <template #fallback>
        <a-spin tip="加载中"/>
      </template>
    </suspense> -->

  </div>


</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {useRoute, useRouter} from "vue-router";
import {Notification} from "@arco-design/web-vue";
import {safeBack} from "@/router";
import {computed, ref,reactive,nextTick} from "vue";
import {DateParser} from "@/assets/lib/utils";
import {UseStore} from "@/store";
import ClipResultCard from "@/components/card/ClipResultCard.vue";
import { progressProps } from "element-plus";
import { getCurrentInstance } from 'vue';
import { watch } from 'vue';

const route = useRoute()
const router = useRouter()
const store = UseStore()
store.loading = true

const {code, msg, data} = await client.get<{ task: TaskLive }>({url: `live_record_task/${route.params.task_id}/`})

// //获取剪辑进度
// let progress = ref(await client.get<{progress: Progress}>({url: `/task/${route.params.task_id}/progress/`}))

if (code !== 4100) {
  Notification.warning(msg)
  safeBack("/dashboard/task-live")
}

// const video_url = await client.video(data.task.videoId)


const base_info = ref([
  {label: "录制开始时间", value: new DateParser(data.task.recordStartTime).all()},
  {label: "录制结束时间", value: new DateParser(data.task.recordEndTime).all()},
  {label: "直播间信息", value: ["哔哩哔哩", "抖音"][data.task.liveRoomInfo.platform]},
  {label: "任务备注", value: data.task.remark},

  {label: "任务状态", value: [`任务失败 —— (${data.task.errorMessage})`, "任务未启动", "正在录制中", "任务已完成"][data.task.taskStatus +1]},
  {label: "任务创建时间", value: new DateParser(data.task.taskCreateTime).all()}
])


// const state = computed(() => {
//   switch (data.task.taskStatus) {
//     case 0:
//     case 1:
//       return "process"
//     case 2:
//       return "finish"
//     default:
//       return "error"
//   }
// })

// const updateProgress = async () => {
//   location.reload()
// }

// const restart = async () => {
//   const res = await client.post<{ task_id: number }>({
//     url: "task/",
//     data: {task: data.task, is_draft:1}
//   })
//   if (res.code === 5000) {
//     await router.push(`/dashboard/task/${res.data.task_id}`)
//     location.reload()
//   } else {
//     Notification.warning(res.msg)
//   }
// }

store.loading = false
</script>

<style scoped lang="less">
// .frame-body {
//   display: flex;
//   background: var(--color-bg-2);
// }

// .frame-aside {
//   padding: 24px;
//   height: 250px;
//   border-right: 1px solid var(--color-border);
// }

// .frame-main {
//   width: 100%;
// }

// .main-content {
//   text-align: center;
//   line-height: 200px;
//   margin:7.5%
// }


</style>
