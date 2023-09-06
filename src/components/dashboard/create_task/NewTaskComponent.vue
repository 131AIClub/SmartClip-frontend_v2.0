<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, TabsPaneContext } from "element-plus";
import NewTaskInputBar from "./NewTaskInputBar.vue"
import NewTaskUpload from "./NewTaskUpload.vue"
import ClipRequirementDialog from "./ClipRequirementDialog.vue"
import { client } from "@/assets/lib/request";
import { Notification, RequestOption, UploadRequest } from '@arco-design/web-vue';

// const emit = defineEmits(["submitTask"])

const tabActiveName = ref("urlDownload")

//输入的内容，链接或者是file
const inputData = ref()

//输入完成的回调
//使用这个回调会弹出弹框
//source 0是URL下载，1是直播录制，2是文件上传
const inputSubmitted = (source, content) => {
  inputData.value = {
    source,
    content
  }

  clipRequirementDialogVisible.value = true

  needSelectTime.value = (source == 1)
}

//控制剪辑需求对话框是否可见
const clipRequirementDialogVisible = ref(false)


//确认对话框中是否需要选择时间
const needSelectTime = ref(false)

const submit = async (res) => {

  if (res.code === 114) {
    ElMessage({
      type: "success",
      message: "创建成功，页面将于2秒后自动刷新！",
      center: true,
      duration: 2000
    })

    setTimeout(() => {
      // clipRequirementDialogVisible.value = false
      location.reload()
    }, 2000);



  } else {
    Notification.error({
      content: res.msg,
      closable: true,
      duration: 1000000,
    })
  }
}

</script>

<template>
  <el-tabs v-model="tabActiveName" stretch="true" class="tabs-item">
    <el-tab-pane name="urlDownload">
      <template #label>
        <el-icon>
          <icon-link />
        </el-icon>
        <span>
          &nbsp;URL下载
        </span>
      </template>

      <div style="position:relative">
        <NewTaskInputBar :task-source="0" @submitUrl="url => inputSubmitted(0, url)" />
      </div>


    </el-tab-pane>

    <el-tab-pane name="liveRecord">
      <template #label>
        <el-icon>
          <icon-live-broadcast />
        </el-icon>
        <span>
          &nbsp;直播录制
        </span>
      </template>
      <div style="position:relative">
        <NewTaskInputBar :task-source="1" @submitUrl="url => inputSubmitted(1, url)" placeholder="请输入B站/抖音直播间链接" />
      </div>
    </el-tab-pane>

    <el-tab-pane name="uploadVideo">
      <template #label>
        <el-icon>
          <icon-upload />
        </el-icon>
        <span>
          &nbsp;上传视频
        </span>
      </template>
      <div style="position:relative">
        <NewTaskUpload @submitVideoFile="video => inputSubmitted(2, video)" />
      </div>
    </el-tab-pane>
  </el-tabs>

  <el-dialog :destroy-on-close="true" :show-close="false" v-model="clipRequirementDialogVisible"
    style="--el-dialog-padding-primary: 0px; border-radius: 20px">
    <ClipRequirementDialog @submit="submit" :inputData="inputData" :needSelectTime="needSelectTime" />
  </el-dialog>
</template>

<style scoped>
.tabs-item {
  padding-left: 20%;
  padding-right: 20%;
}
</style>