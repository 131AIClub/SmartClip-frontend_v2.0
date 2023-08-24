<!-- 这是任务细节的.vue文件 后面要大改 -->
<template>
  <div class="flex flex-col gap-2 md:gap-4 w-[96%] max-w-[960px] m-auto">
    <a-card title="任务进度" hoverable class="hidden md:block">
      <a-steps :current="data.task.taskStatus+1||3"  :status="state" type="navigation">
        <a-step>草稿</a-step>
        <a-step>切片</a-step>
        <a-step>编辑</a-step>
        <a-step>投放</a-step>
      </a-steps>
    </a-card>

    <a-card title="任务详情" hoverable v-if="data.task.taskStatus !== 2">
      <div class="md:px-4">
        <a-descriptions :data="base_info" title="基础信息" :column="1" bordered/>
        <br>
        <a-descriptions :data="clip_info" title="剪辑需求" :column="{xs:1, lg:2}" bordered/>
        <br>

        <!-- 剪辑进度 -->
        <div v-if="progress_info.length">
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
        </div>
      </div>

      <div v-if="data.task.taskStatus === 0" class="pt-4 flex justify-center">
        <a-button status="success" @click="router.push(`/dashboard/create-task/${data.task.taskId}`)">
          继续编辑
        </a-button>
      </div>
      <!-- <div v-if="data.task.taskStatus==1" class="pt-4 flex justify-center">
        <a-button status="success" @click="updateProgress">
          更新剪辑进度
        </a-button>
      </div> -->
      <div v-if="data.task.taskStatus==-1" class="pt-4 flex justify-center">
        <a-popconfirm content="确定要重启当前任务吗？" type="warning" @ok="restart">
          <a-button status="danger">
            重试当前剪辑任务
          </a-button>
        </a-popconfirm> 
      </div>
    </a-card>


    <a-card title="原始视频" hoverable v-if="video_url && data.task.taskStatus === 2">
      <div class="flex justify-center items-center">
        <video class="max-h-[80vh]" controls>
          <source :src="video_url" type="video/mp4">
        </video>
      </div>
    </a-card>

    <suspense>
      <clip-result-card :task_id="data.task.taskId" v-if="video_url && data.task.taskStatus === 2"/>
      <template #fallback>
        <a-spin tip="加载中"/>
      </template>
    </suspense>
  </div>

</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {useRoute, useRouter} from "vue-router";
import {Notification} from "@arco-design/web-vue";
import {safeBack} from "@/router";
import {computed, ref} from "vue";
import {DateParser} from "@/assets/lib/utils";
import {UseStore} from "@/store";
import ClipResultCard from "@/components/card/ClipResultCard.vue";


const route = useRoute()
const router = useRouter()
const store = UseStore()
store.loading = true

const {code, msg, data} = await client.get<{ task: Task }>({url: `task/${route.params.task_id}/`})

//获取剪辑进度
let progress = ref(await client.get<{progress: Progress}>({url: `/task/${route.params.task_id}/progress/`}))

if (code !== 3000) {
  Notification.warning(msg)
  safeBack("/dashboard/task")
}

const video_url = await client.video(data.task.videoId)

const error_info = computed(() => {
  switch(data.task.errorStage){
    case 0:
      return "解析视频内容时出错"
    case 1:
      return "生成剪辑点时出错"
    case 2:
      return "剪辑中出错"
    default:
      return "未知错误"
  }
})

const base_info = ref([
  {label: "ID", value: data.task.taskId.toString()},
  {label: "创建于", value: new DateParser(data.task.taskCreateTime).all()},
  {label: "状态", value: [`任务失败 —— ${error_info.value}(${data.task.errorMessage})`, "草稿", "切片中", "已完成"][data.task.taskStatus + 1]}
])

const clip_info = ref([
  {label: "视频场景", value: ["综合", "直播带货", "知识科普"][data.task.clipRequirement.videoType]},
  // {label: "剪辑风格", value: ["自定义", "抽象", "正经"][data.task.clipRequirement.clipStyle]},
  // {label: "视频长度", value: ["长", "中", "短"][data.task.clipRequirement.clipLength]},
  // {label: "切片最大数量", value: data.task.clipRequirement.videoType===0 
  // ? data.task.clipRequirement.maxClipNum.toString()
  // : "锁定"},
    {label: "切片最大数量", value:  data.task.clipRequirement.maxClipNum.toString()},
  {label:"使用模板",value:(data.task.clipRequirement.templateId === -1) ?"暂无模板" : "张琦老师测试模板"},
  // {label: "额外需求", value: data.task.clipRequirement.otherRequirement || "无"}
])


const progress_info = ref( progress.value.code===100? [
  {label: "任务进度", value: ["正在解析视频内容", "正在生成剪辑点", "正在剪辑中...", "剪辑完成"][progress.value.data.progress.stage]},
  {label: "任务状态", value: progress.value.data.progress.failed===true ? "任务失败" : "正常进行中"},
  {label: "已剪切片", value: progress.value.data.progress.clippedNum.toString()},
  {label: "总切片数", value: progress.value.data.progress.totalClipNum.toString()},
] : []
)

const state = computed(() => {
  switch (data.task.taskStatus) {
    case 0:
    case 1:
      return "process"
    case 2:
      return "finish"
    default:
      return "error"
  }
})

const updateProgress = async () => {
  location.reload()
}

const restart = async () => {
  const res = await client.post<{ task_id: number }>({
    url: "task/",
    data: {task: data.task, is_draft:1}
  })
  if (res.code === 5000) {
    await router.push(`/dashboard/task/${res.data.task_id}`)
    location.reload()
  } else {
    Notification.warning(res.msg)
  }
}

store.loading = false
</script>

<style scoped lang="less">
.frame-body {
  display: flex;
  background: var(--color-bg-2);
}

.frame-aside {
  padding: 24px;
  height: 250px;
  border-right: 1px solid var(--color-border);
}

.frame-main {
  width: 100%;
}

.main-content {
  text-align: center;
  line-height: 200px;
  margin:7.5%
}


</style>
