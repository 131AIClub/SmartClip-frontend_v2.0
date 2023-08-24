<!-- 这是显示支付结果的.vue文件 -->
<template>
    <div class="flex flex-col gap-2 md:gap-4">
        <a-card title="充值结果" hoverable>

            <div class="h-[20vh] md:h-[20vh]"></div>

            <!-- 交易状态
            -1表示未知原因导致状态错误
            0表示交易不存在
            1表示正在等待买家付款
            （注意：跳转到支付宝界面之后，在用户扫码之前，依然是交易不存在的状态，当用户扫码或者登录之后，状态才会变成等待付款）
            2表示交易完成 -->

            <a-result v-if="payState === 2" status="success" title="充值成功！">
                <template #subtitle>
                    感谢您对SmartClip的支持！
                </template>
                <template #extra>
                    <a-space>
                        <a-button type='primary' @click="router.push('/dashboard/profile')">返回</a-button>
                    </a-space>
                </template>
            </a-result>

            <a-result v-else status="error" :title="errorInfo">
                <template #subtitle>
                    本次充值遇到错误，如果。
                </template>

                <template #extra>
                    <a-space>
                        <a-button type='primary' @click="router.push('/dashboard/payment')">返回</a-button>
                    </a-space>
                </template>
            </a-result>

            <div class="h-[20vh] md:h-[20vh]"></div>

        </a-card>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from "vue-router";
import { UseStore } from "@/store";
import { ref, computed } from "vue";
import { client } from "@/assets/lib/request";
const router = useRouter()
const store = UseStore()

store.loading = true

const res = ref(await client.get<{ creditTask: CreditTask }>({ url: `/credit/${store.$state.order_id}/` }))

const payState = ref(res.value.data.creditTask.status)

const errorInfo = computed(() => {
    switch (payState.value) {
        case -1:
            return "未知错误"
        case 0:
            return "交易不存在"
        case 1:
            return "正在等待买家付款"
        case 2:
            return "交易完成"
        default:
            return "意料之外的错误"
    }
})

// 交易状态
// -1表示未知原因导致状态错误
// 0表示交易不存在
// 1表示正在等待买家付款
// （注意：跳转到支付宝界面之后，在用户扫码之前，依然是交易不存在的状态，当用户扫码或者登录之后，状态才会变成等待付款）
// 2表示交易完成

store.loading = false
</script>
  
<style scoped lang="less"></style>
  