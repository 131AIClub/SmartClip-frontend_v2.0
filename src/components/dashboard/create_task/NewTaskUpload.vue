<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import {ref} from "vue";
import {UploadFile, UploadFiles, UploadRawFile} from "element-plus";

const props=defineProps({
  componentHeight:{
    type:Number,
    required:false,
    default:230
  }
})

const emit=defineEmits(["submitVideoFile"])

const uploadChange=(uploadFile: UploadFile, uploadFiles: UploadFiles)=>{
  uploadFiles.splice(0,1)

  let fileName=uploadFile.raw.name
  console.log(fileName)
  if(!fileName.endsWith(".mp4")){
    formatError.value=true
    return false
  }else{
    formatError.value=false
  }

  emit("submitVideoFile",uploadFile.raw)

  return false
}

const formatError=ref(false)

</script>

<template>
  <div class="component-content">
    <div class="upload-body">

      <el-upload
          drag
          :on-change="uploadChange"
          :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          <div v-if="!formatError">
            文件拖放到此处 或者 <em>点击上传</em>
          </div>

          <div style="color: red" v-if="formatError">
            <icon-exclamation-circle-fill />
            请上传mp4格式的文件！
          </div>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            <icon-exclamation-circle />
            只支持上传mp4格式的视频文件！
          </div>
        </template>
      </el-upload>
    </div>


  </div>

</template>

<style scoped>

.component-content{
  width: 50%;
  left:50%;
  transform: translateX(-50%);
  position: relative;
  height: v-bind(componentHeight + 'px')
}

.upload-body{
  top: 20px;
  position: relative;
}

</style>