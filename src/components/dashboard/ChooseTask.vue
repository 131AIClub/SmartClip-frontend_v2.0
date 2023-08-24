<!-- 这是选择工作任务的.vue文件 -->
<template>
    <div class="flex flex-col gap-2 md:gap-4">
        <a-card title="选择工作任务" hoverable>

            <!-- 设置空行 -->
            <div class="h-[10vh] md:h-[10vh]"></div>

            <el-row class="flex justify-center items-center w-full">
                <el-card :body-style="{ padding: '0px' }" class="w-1/6 hover:bg-slate-300 cursor-pointer"
                    @click="router.push('/dashboard/create-task')">
                    <img src="/ChooseClip.png" class="image" />
                    <div style="padding: 14px">
                        <span class="text-3xl font-bold tracking-wider">AI视频剪辑</span>
                        <div class="bottom">
                            <span class="text-base text-gray-500">
                                通过我们的平台，您只需上传您的原始视频，选择一些基本参数，然后让AI算法自动为您进行剪辑。
                                我们的智能算法能够快速而准确地分析视频内容，从中剪辑出有趣的片段。
                                每个视频都捕捉到了原视频中的精华。
                                无需繁琐的编辑步骤，无需专业的技能，您就可以在短时间内获得一系列精美的小视频，
                                这些视频可以用于社交媒体分享、营销宣传、个人创意表达等各种用途。
                            </span>
                        </div>
                    </div>
                </el-card>

                <div class="w-1/6"></div>

                <el-card :body-style="{ padding: '0px' }" class="w-1/6 hover:bg-slate-300 cursor-pointer"
                    @click="router.push('/dashboard/create-task-live')">
                    <img src="/ChooseLive.png" class="image" />
                    <div style="padding: 14px">
                        <span class="text-3xl font-bold tracking-wider">AI直播推流</span>
                        <div class="bottom">
                            <span class="text-base text-gray-500">
                                在数字化时代，我们的AI直播推流功能为您带来前所未有的便利。
                                通过输入直播间地址，系统即刻启动自动录制，将直播内容保存在个人视频资源库中。
                                您可以随时剪辑这些录像，投放到不同平台，无需手动操作，
                                更能集中精力于直播的精彩内容呈现。
                                这一创新功能让您充分利用直播，将它们转化为有价值的数字资产，轻松扩大影响力。
                            </span>
                        </div>
                    </div>
                </el-card>
            </el-row>

            <!-- 设置空行 -->
            <div class="h-[10vh] md:h-[10vh]"></div>

        </a-card>

    </div>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
const router = useRouter()

</script>

<style scoped lang="less">
.el-card {
    width: 30%
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image {
    width: 100%;
    display: block;
}
</style>
