<!-- 这是选择工作任务的.vue文件 -->
<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <a-card title="创建视频剪辑任务" hoverable>

      <!-- 返回按钮 -->
      <a-button type="outline" @click="router.push('/dashboard/choose-task')">
        <template #icon>
          <icon-left />
        </template>
        返回
      </a-button>

      <!-- 选项 -->
      <div class="flex justify-center items-center">
        <a-form :model="task" class="w-[96%] max-w-[640px] p-2" layout="vertical">

          <a-form-item label="上传视频" required tooltip="人声丰富的剪辑效果更佳" v-if="!isDraft">
            <a-upload multiple :limit="1" :custom-request="upload" draggable :show-cancel-button="false"
              :show-remove-button="false" accept=".mp4" tip="当前仅支持.mp4格式" />
          </a-form-item>

          <a-form-item label="当前视频" required tooltip="保存草稿中视频无法进行修改" v-if="isDraft">
            <video controls >
              <source :src="draftVideoUrl" type="video/mp4">
            </video>
          </a-form-item>

          <!-- 进度条 -->
          <a-progress v-if="isUpload" size="medium" :percent=uploadProgress :style="{ width: '100%' }" />

          <div class="h-[20vh] md:h-[2.5vh]"></div>

          <a-form-item label="视频场景" required>
            <a-select v-model="task.clipRequirement.videoType" :default-value="0">
              <a-option :value="0">综合</a-option>
              <a-option :value="1">直播带货</a-option>
              <a-option :value="2">知识科普</a-option>
            </a-select>
          </a-form-item>

          <!-- <a-form-item label="剪辑风格" required>
            <a-select v-model="task.clipRequirement.clipStyle" :default-value="0" disabled>
              <a-option :value="0">自定义</a-option>
              <a-option :value="1">抽象</a-option>
              <a-option :value="2">正经</a-option>
            </a-select>
          </a-form-item> -->

          <!-- <a-form-item label="视频长度" required>
            <a-select v-model="task.clipRequirement.clipLength" :default-value="0" disabled>
              <a-option :value="0">长</a-option>
              <a-option :value="1">中</a-option>
              <a-option :value="2">短</a-option>
            </a-select>
          </a-form-item> -->

          <a-form-item v-if="task.clipRequirement.videoType === 0" label="最大切片数量" required>
            <a-input-number v-model="task.clipRequirement.maxClipNum" :default-value="1" mode="button" :min="1"
              :max="getMaxClipNum()" />
            <!-- 提示信息 -->
            <template #extra>
              <div>每发布1个切片需要消耗1点积分</div>
            </template>
          </a-form-item>
          <!-- <a-select v-model="task.clipRequirement.clipNum" :default-value="0">
              <a-option :value="0">较多</a-option>
              <a-option :value="1">中等</a-option>
              <a-option :value="2">较少</a-option>
            </a-select> -->

          <a-form-item label="是否使用模板" layout="horizontal">
            <a-switch v-model="useTemplate" checked-text="启用模板" @change="changeSwitch" />
          </a-form-item>

          <a-form-item label="选择模板" required v-if="useTemplate">
            <a-select v-model="task.clipRequirement.templateId" :default-value=templates[0].templateId>
              <a-option v-for="template in templates" :key="template.templateId" :value="template.templateId">
                {{ template.templateName }}
              </a-option>
            </a-select>
          </a-form-item>

          <!-- <a-form-item label="其它描述">
            <a-textarea v-model="task.clipRequirement.otherRequirement" placeholder="描述其他需求...(暂时不启用)" allow-clear disabled/>
          </a-form-item> -->

          <div class="h-[20vh] md:h-[5vh]"></div>

          <div class="flex justify-end items-center gap-4">
            <a-button type="outline" status="success" @click="save(0)" :disabled="!task.videoId">
              保存草稿
            </a-button>
            <a-button type="primary" status="success" @click="save(1)" :disabled="(!task.videoId && clicked)">
              创建任务
            </a-button>
          </div>

        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Notification, RequestOption, UploadRequest } from "@arco-design/web-vue"
import { client } from "@/assets/lib/request";
import axios, { Canceler } from "axios"
import { useRoute, useRouter } from "vue-router";
import { safeBack } from "@/router";
import { UseStore } from "@/store";

const route = useRoute()
const router = useRouter()
const store = UseStore()
const task = ref<Omit<Task, "taskId" | "taskStatus" | "taskCreateTime"> & { videoId?: number, taskId?: number }>({
  clipRequirement: {
    videoType: 0,
    // clipStyle: 0,
    // clipLength: 0,
    // clipNum: 1,
    // otherRequirement: ""
    maxClipNum: 1,
    templateId: -1//想要使用的模板ID，如果为-1就代表不使用模板
  },
  videoId: 0,//默认为0
  errorStage: -1,//错误类型初始化为-1
  errorMessage: ""
})

//是否显示进度条，进度条的进度
let isUpload = ref(false)
let uploadProgress = ref(0)

//是否使用模板
const useTemplate = ref(false)
const changeSwitch = () => {
  if (useTemplate.value === false)
    task.value.clipRequirement.templateId = -1
  if (useTemplate.value === true)
    task.value.clipRequirement.templateId = 1
}
//

//获取所有模板
const templateData = await client.get<{ templates: Template[] }>({ url: "template/" })
const templates = templateData.data.templates
//

//编辑草稿的时候，控制加载动画
const isDraft = ref(false)
const draftVideoUrl = ref("")
if (route.params.task_id) {
  store.loading = true
  isDraft.value = true

  const { code, msg, data } = await client.get<{ task: Task }>({ url: `task/${route.params.task_id}/` })
  if (code !== 3000) {
    Notification.warning(msg)
    safeBack("/dashboard/task")
  }

  //获取该视频的url
  draftVideoUrl.value = await client.video(data.task.videoId)

  task.value = data.task

  store.loading = false
}
//

//上传视频（待修改）
const upload = (option: RequestOption): UploadRequest => {
  const { onProgress, onError, onSuccess, fileItem } = option
  if (!fileItem.file) throw Error("文件不存在")

  const form = new FormData()
  form.append("video", fileItem.file)
  let canceler: Canceler
  isUpload.value = true//正在上传

  const taskRemark = ''
  form.append('remark', taskRemark)

  task.value.videoId = 0

  client.post<{ resource_id: number }>({
    url: "video/",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      onProgress(e.progress || 0, e.event)
      uploadProgress.value = Number(e.progress?.toFixed(2)) || 0//更新进度条
    },
    cancelToken: new axios.CancelToken((c) => {
      canceler = c
    }),
  }).then(res => {
    if (res.code === 1000) {
      task.value.videoId = res.data.resource_id
    } else {
      Notification.warning(res.msg)
    }
    onSuccess("123")
  }).catch(err => {
    console.warn(err);
    onError(err)
  })

  return {
    abort() {
      canceler("取消上传")
      //取消上传
      isUpload.value = false
      uploadProgress.value = 0
    }
  }
}
//

//保存草稿或任务
const clicked = ref(true)//设置只能点击一次
const save = async (is_draft: number) => {

  if(store.user.freePoint === 0)
  {
    Notification.error({
      title: '创建任务失败',
      content: '积分不足，无法创建任务',
      closable: true,
      duration: 1000000,
      onClose: () => {
        window.location.reload()
      }
    })
    return 
  }

  clicked.value = false
  const res = await client.post<{ task_id: number }>({
    url: "task/",
    data: { task: task.value, is_draft }
  })
  if (res.code === 5000) {
    Notification.success(is_draft ? "创建成功" : "已保存")
    await router.push(`/dashboard/task/${res.data.task_id}`)
  }
  else {
    //出错的提示，会保留很久，逻辑是点击关闭按钮，页面会进行刷新
    Notification.error({
      title: '创建任务失败',
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

//获取最大的剪辑次数：min(10，用户积分)
const getMaxClipNum = () => {
  const userScore = store.user.freePoint
  return Math.min(userScore, 10)
}
//

</script>

<style scoped lang="less"></style>
