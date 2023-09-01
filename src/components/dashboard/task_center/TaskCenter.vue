<!-- 这是视频资源库的.vue文件 -->
<template>
    <div class="flex flex-col gap-2 md:gap-4">
        <a-card title="任务中心" hoverable>

            <a-space size="large">
                <a-button type="primary" @click="uploadNewVideo">
                    上传新视频
                </a-button>

                <!-- <a-divider direction="vertical" /> -->

                <!-- <div>展示选项：</div>
                <a-select v-model="source" :default-value="-1" @change="load">
                    <a-option :value="-1">全部视频资源</a-option>
                    <a-option :value="0">用户上传视频</a-option>
                    <a-option :value="1">视频剪辑结果</a-option>
                    <a-option :value="2">直播录制结果</a-option>
                </a-select> -->
            </a-space>

            <div class="h-[5vh]"></div>

            <!-- 列表项 -->
            <!-- <a-table :columns="columns" :data="videos" :pagination="{ total, pageSize: page_size, simple: true }"
                @row-click="" @page-change="pageChange" v-model:loading="loading"
                :size="store.is_mobile ? 'mini' : 'small'">

                <template #createTime="{ rowIndex }">
                    <div class="text-[10px] my-2">{{ date(videos[rowIndex].createTime) }}</div>
                </template>

                <template #videoPreview="{ rowIndex }">
                    <a-image class="w-40 h-40 overflow-hidden" :src="videos[rowIndex].videoPreview"
                        :description="timeChange(videos[rowIndex].length)" fit="cover" width="160" height="90">

                        <template #extra>
                            <div class="actions">
                                <span class="action cursor-pointer" @click="watchVideo(rowIndex)"><icon-eye /></span>

                                <a-divider direction="vertical" />

                                <span class="action cursor-pointer"
                                    @click="downloadImage(rowIndex)"><icon-download /></span>
                            </div>
                        </template>
                    </a-image>
                </template>

                <template #source="{ rowIndex }">
                    <a-tag :color="['gold', 'blue', 'green',][videos[rowIndex].source]" size="large">
                        {{ ["用户上传视频", "视频剪辑结果", "直播录制结果"][videos[rowIndex].source] }}
                    </a-tag>
                </template>

                <template #button="{ rowIndex }">
                    <a-button type="outline" size="large" @click="changeRemark(rowIndex)">修改备注</a-button>

                    <a-divider direction="vertical" />

                    <a-button type="primary" size="large" @click="downloadVideo(rowIndex)">
                        <icon-download />
                        下载视频
                    </a-button>

                </template>
            </a-table> -->

            <div class="ml-48">
                <a-space wrap :size=80>
                    <!-- <task-card v-for="(task, index) in tasks" :key="index" :task-remark="task.taskRemark"
                        :task-status="task.taskStatus" /> -->
                </a-space>
            </div>

            <div class="flex justify-center ">
                <a-pagination :total="50" @change="pageChange" size="large" />
            </div>


        </a-card>

        <!-- <a-modal v-model:visible="changeRemarkVisible" @ok="handleOk" @cancel="">
            <template #title>
                修改视频备注信息
            </template>
            <a-form :model="allRemark">
                <a-form-item label="当前备注:" disabled>
                    <a-input value="large" v-model="allRemark.oldRemark" />
                </a-form-item>

                <a-form-item label="新的备注:">
                    <a-input value="large" v-model="allRemark.newRemark" allow-clear />
                </a-form-item>
            </a-form>
        </a-modal> -->

        <!-- <a-modal v-model:visible="uploadVisible" @ok="toUpload" @cancel="toCancel" :closable="false"
            :okLoading="!isUploadOver">
            <template #title>
                上传新视频
            </template>
            <a-form :model="newVideo" layout="vertical">
                <a-form-item field="视频资源" label="视频资源" required>
                    <a-upload multiple :limit="1" :custom-request="upload" draggable :show-cancel-button="false"
                        :show-remove-button="false" />
                </a-form-item>

                <a-progress v-if="isUpload" size="medium" :percent=uploadProgress :style="{ width: '100%' }" />

                <a-form-item field="视频备注" label="视频备注">
                    <a-input value="large" v-model="newVideo.remark" allow-clear />
                </a-form-item>
            </a-form>
        </a-modal> -->
    </div>

    <!-- <a-modal v-model:visible="isWatchVideo" hide-cancel ok-text="关闭" @ok="clearVideo" @cancel="clearVideo">
        <template #title>
            预览视频
        </template>
        <div class="flexible justify-center items-center " ref="videoContainer"></div>
    </a-modal> -->
</template>
    
<script setup lang="ts">
import { client } from "@/assets/lib/request";
import { ref, reactive, watch,onMounted } from "vue";
import { DateParser } from "@/assets/lib/utils";
import { TableData } from "@arco-design/web-vue"
import { UseStore } from "@/store";
import { Notification, RequestOption, UploadRequest } from '@arco-design/web-vue';
import axios, { Canceler } from "axios"
import TaskCard from "@/components/card/TaskCard.vue";

const store = UseStore()
store.loading = true

//切换主题为白色
document.body.removeAttribute('arco-theme')

const page = ref(0)
const loading = ref(false)
// const columns = ref<TableData[]>([
//     {
//         title: "视频预览",
//         dataIndex: "videoPreview",
//         slotName: "videoPreview",
//     },
//     {
//         title: "ID",
//         dataIndex: "videoId",
//         slotName: "videoId",
//         sortable: {
//             sortDirections: ['ascend']
//         }
//     },
//     {
//         title: "创建时间",
//         dataIndex: "createTime",
//         slotName: "createTime",

//     },
//     {
//         title: "资源来源",
//         dataIndex: "source",
//         slotName: "source"
//     },
//     {
//         title: "任务备注",
//         dataIndex: "remark",
//         slotName: "remark"
//     },
//     {
//         title: "操作",
//         slotName: "button"
//     }
// ])

const tasks = ref<Task[]>([])
const total = ref<number>()
const pageSize = ref<number>(9)//每页展示九个任务
// const source = ref(-1)
const load = async () => {
    const res = await client.get<{ tasks: Task[], total: number }>(
        { url: `task/?page_count=${pageSize.value}&page_num=${page.value}` }
    )
    if (res.code === 114) {
        total.value = res.data.total
        tasks.value = res.data.tasks

        //逐个获取视频预览图片的url !!!!!!!!!!!!!!!!正式使用记得打开
        // for (var i = 0; i < tasks.value.length; ++i) {
        //     const currentPreviewVideoId = tasks.value[i].videoId
        //     tasks.value[i].videoImageUrl = await client.image(currentPreviewVideoId)
        // }
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

// const date = (timestamp: number) => {
//     return new DateParser(timestamp).all()
// }

//把毫秒改成时分秒，这是视频时间有关的东西
// const timeChange = (oldTime: number) => {
//     const totalSeconds = Math.floor(oldTime / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     return formattedTime;
// }

//修改备注
// const allRemark = reactive({
//     oldRemark: '',
//     newRemark: ''
// })

// const changeRemarkVisible = ref(false)
// const currentRemarkVideoId = ref(-1)
// const changeRemark = (rowIndex) => {
//     allRemark.oldRemark = videos.value[rowIndex].remark
//     currentRemarkVideoId.value = videos.value[rowIndex].videoId
//     changeRemarkVisible.value = true
// }
// const handleOk = async () => {
//     const res = await client.post<{}>({
//         url: `video_resource/${currentRemarkVideoId.value}/remark/`,
//         data: { remark: allRemark.newRemark }
//     })
//     if (res.code === 7100) {
//         await load()
//         Notification.success("修改成功！")
//     }
//     else {
//         Notification.error(res.msg)
//     }
// }
//

const pageChange = async (newPage: number) => {
    //！！！！！！！！！！正式使用记得打开
    // page.value = newPage - 1
    // loading.value = true
    // await load()
    // loading.value = false
}

//上传新视频
// const newVideo = reactive({
//     video: '',//这个没用到
//     remark: ''
// })
// const uploadVisible = ref(false)
// const uploadNewVideo = () => {
//     uploadVisible.value = true
// }

// let isUpload = ref(false)//显示上传的进度条
// let uploadProgress = ref(0)

// const CurrentUploadVideoId = ref(0)
// const isUploadOver = ref(false)

// const upload = (option: RequestOption): UploadRequest => {
//     const { onProgress, onError, onSuccess, fileItem } = option
//     if (!fileItem.file) throw Error("文件不存在")

//     const form = new FormData()
//     form.append("video", fileItem.file)
//     let canceler: Canceler
//     isUpload.value = true//正在上传

//     //默认流程是上传视频没有备注信息，然后填写备注后自动修改备注信息
//     const taskRemark = ''
//     form.append('remark', taskRemark)

//     client.post<{ resource_id: number }>({
//         url: "video/",
//         data: form,
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (e) => {
//             onProgress(e.progress || 0, e.event)
//             uploadProgress.value = Number(e.progress?.toFixed(2)) || 0//更新进度条
//         },
//         cancelToken: new axios.CancelToken((c) => {
//             canceler = c
//         }),
//     }).then(res => {
//         if (res.code === 1000) {
//             CurrentUploadVideoId.value = res.data.resource_id
//             isUploadOver.value = true
//         } else {
//             Notification.warning(res.msg)
//         }
//         onSuccess("123")
//     }).catch(err => {
//         console.warn(err);
//         onError(err)
//     })

//     return {
//         abort() {
//             canceler("取消上传")
//             //取消上传
//             isUpload.value = false
//             uploadProgress.value = 0
//         }
//     }
// }

// const toUpload = async () => {
//     //更新备注
//     const res = await client.post<{}>({
//         url: `video_resource/${CurrentUploadVideoId.value}/remark/`,
//         data: { remark: newVideo.remark }
//     })
//     if (res.code === 7100) {
//         await load()
//         Notification.success({
//             content: "视频上传成功！",
//             duration: 3000,
//         });
//     }
//     else {
//         Notification.warning(res.msg)
//     }

//     //刷新
//     location.reload()
// }

// const toCancel = () => {
//     if (CurrentUploadVideoId.value !== 0)
//         location.reload()
//     else if (newVideo.remark)
//         newVideo.remark = ''
// }
//

//观看预览视频
// const isWatchVideo = ref(false)
// const currentWatchVideoUrl = ref('')

// const videoContainer = ref(null)//对div标签的引用
// const watchVideo = async (index: number) => {
//     currentWatchVideoUrl.value = await client.video(videos.value[index].videoId)

//     // 创建 video 标签
//     const videoTag = document.createElement("video");
//     videoTag.controls = true;
//     videoTag.src = currentWatchVideoUrl.value;

//     // 将 video 标签添加到 videoContainer 中
//     videoContainer.value.appendChild(videoTag);

//     isWatchVideo.value = true
// }

//下载图片
// const downloadImage = async (index: number) => {
//     videos.value[index].videoPreview

//     const imageUrl = videos.value[index].videoPreview
//     const response = await axios.get(imageUrl, { responseType: "blob" })

//     const blob = new Blob([response.data], { type: response.headers["content-type"] })
//     const url = window.URL.createObjectURL(blob)

//     const link = document.createElement("a")
//     link.href = url
//     link.download = "downloaded_image.jpg" // 下载后的文件名，可以根据需要修改
//     link.target = "_blank"; // 在新标签页打开链接，以防止浏览器拦截
//     link.click();

//     window.URL.revokeObjectURL(url);
// }
//

//下载视频
// const downloadVideo = async (index: number) => {
//     currentWatchVideoUrl.value = await client.video(videos.value[index].videoId)
//     console.log(currentWatchVideoUrl.value)

//     const videoUrl = currentWatchVideoUrl.value;
//     const response = await axios.get(videoUrl, { responseType: 'blob' });

//     const blob = new Blob([response.data], { type: 'video/mp4' });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     a.download = 'video.mp4'; // 下载文件的名称
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
// }
//

//关闭预览视频窗口触发函数
// const clearVideo = () => {
//     const videoTag = document.querySelector("video");
//     videoTag.src = ""; // 清空视频源
//     videoTag.remove(); // 从 DOM 中移除
// }

//
// await load() !!!!!!!!!!!!!!!!正式使用记得打开
store.loading = false


</script>
    
<style  lang="less">

</style>
    