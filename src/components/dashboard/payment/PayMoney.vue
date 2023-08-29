<!-- 这是支付的.vue文件 -->
<template>
    <div class="flex flex-col gap-2 md:gap-4">
        <a-card title="积分充值" hoverable>

            <a-button type="outline" @click="router.push('/dashboard/profile')">
                <template #icon>
                    <icon-left />
                </template>
                返回
            </a-button>

            <div class="flex">
                <div class="w-4/6 p-4">

                    <!-- 左侧区域的内容，水平居中 -->
                    <div class="flex  justify-center h-full ml-48">
                        <a-form :model="form" layout="vertical" class="w-[96%] max-w-[640px] p-2 ">

                            <a-form-item label="充值金额（￥）" required>
                                <a-radio-group v-model="selectedAmount">
                                    <a-grid :cols="3" :colGap="24" :rowGap="16">
                                        <a-grid-item>
                                            <a-radio value="10">10</a-radio>
                                        </a-grid-item>
                                        <a-grid-item>
                                            <a-radio value="20">20</a-radio>
                                        </a-grid-item>
                                        <a-grid-item>
                                            <a-radio value="50">50</a-radio>
                                        </a-grid-item>
                                        <a-grid-item>
                                            <a-radio value="100">100</a-radio>
                                        </a-grid-item>
                                        <a-grid-item>
                                            <a-radio value="200">200</a-radio>
                                        </a-grid-item>
                                        <a-grid-item>
                                            <a-radio value="500">500</a-radio>
                                        </a-grid-item>
                                        <a-grid-item>
                                            <a-radio value="DIY">自定义</a-radio>
                                        </a-grid-item>
                                    </a-grid>
                                </a-radio-group>
                            </a-form-item>

                            <a-form-item v-if="selectedAmount === 'DIY'" label="自定义金额（￥）" required tooltip="单次交易限额1~10000￥">
                                <a-input-number :style="{ width: '320px' }" v-model="selectedNumber" placeholder="请输入金额"
                                    :default-value=500 mode="button" :min="1" :max="10000">
                                </a-input-number>
                            </a-form-item>

                            <div class="h-[20vh] md:h-[1.5vh]"></div>

                            <a-form-item label="支付平台" required>
                                <a-select :style="{ width: '320px' }" :default-value="0" disabled>
                                    <a-option :value="0">支付宝</a-option>
                                    <a-option :value="1">微信</a-option>
                                    <a-option :value="2">银联</a-option>
                                </a-select>
                            </a-form-item>

                            <a-form-item label="其他选项" disabled required>
                                <a-checkbox value="1">Option 1</a-checkbox>
                                <a-checkbox value="2">Option 1</a-checkbox>
                                <a-checkbox value="3">Option 1</a-checkbox>
                                <a-checkbox value="4">Option 1</a-checkbox>
                            </a-form-item>

                            <a-form-item label="开启自动支付" disabled required>
                                <a-switch />
                            </a-form-item>

                            <a-form-item>
                                <a-checkbox v-model="isSure">
                                    我已经阅读过《充值规则说明》
                                </a-checkbox>
                            </a-form-item>

                            <a-button :style="{ width: '100px' }" type="primary" status="success" @click="toPay"
                                :disabled="!isSure">确认支付</a-button>

                            <!-- 把取消按钮给隐藏了 -->
                            <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" ok-text="已完成充值"
                                 hide-cancel :closable="false">
                                <template #title>
                                    充值完成前请不要关闭此窗口
                                </template>
                                <div>
                                    请在新打开的页面中完成充值，完成后点击对应按钮。
                                </div>
                            </a-modal>

                        </a-form>
                    </div>
                </div>

                <!-- 分割线 -->
                <div class="w-1/16">
                    <div class="border-l border-gray-300 h-full"></div>
                </div>

                <div class="w-1/3 p-4">
                    <!-- 右侧区域的内容，紧贴分割线 -->
                    <div class="flex flex-col h-full">
                        <div class="text-center mb-4">
                            <h2 class="text-5xl font-bold">充值规则说明</h2> <!-- 增加字体大小 -->
                        </div>

                        <div class="h-[20vh] md:h-[2.5vh]"></div>

                        <ul class="text-lg mb-8 leading-relaxed"> <!-- 增加字体大小和行间距 -->
                            <li class="mb-2 text-center text-1xl text-blue-800 font-bold">一、1元人民币 -> 1点积分</li>

                            <div class="h-[20vh] md:h-[2.5vh]"></div>
                            <li class="mb-2 text-center text-1xl text-blue-800 font-bold">二、1点积分 -> 1个切片</li>

                            <div class="h-[20vh] md:h-[2.5vh]"></div>
                            <li class="mb-2 text-center text-1xl text-blue-800 font-bold">三、这是规则3这是规则3</li>
                            <!-- 添加其他规则 -->
                            <div class="h-[20vh] md:h-[2.5vh]"></div>
                            <li class="mb-2 text-center text-1xl text-blue-800 font-bold">四、这是规则4这是规则4</li>
                            <div class="h-[20vh] md:h-[2.5vh]"></div>
                            <li class="mb-2 text-center text-1xl text-blue-800 font-bold">五、这是规则5这是规则5</li>
                            <div class="h-[20vh] md:h-[2.5vh]"></div>
                            <li class="mb-2 text-center text-1xl text-blue-800 font-bold">六、这是规则6这是规则6</li>
                        </ul>

                        <p class="text-gray-600 mb-4 font-bold">
                            提示：请仔细阅读并遵守积分规则。我们鼓励您积极参与，享受积分带来的乐趣与优惠。

                        </p>

                        <div class="h-[20vh] md:h-[3vh]"></div>
                        <p class="text-blue-500 text-2xl font-semibold">
                            想要获得更多积分？立即参与我们的积分活动！
                        </p>
                    </div>

                </div>

            </div>

        </a-card>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import { Notification } from '@arco-design/web-vue';
import { UseStore } from "@/store";
const router = useRouter()
const store = UseStore()

const selectedAmount = ref('10')//默认金额
const selectedNumber = ref(500)//默认自定义金额
const isSure = ref(false)//是否阅读过充值规则说明
const visible = ref(false)//支付对话框是否显示

//这个参数没有实际意义，仅仅是为了填充form避免产生bug
const form = reactive({
    name: '',
    post: '',
    isRead: false,
})
//

//得到最终充值金额
const amount = computed(() => {
    if (selectedAmount.value !== 'DIY')
        return parseInt(selectedAmount.value)
    else
        return selectedNumber.value
})
//

//点击确认支付
const toPay = () => {
    // 使用window.open()方法打开一个新页面，并指定页面URL
    const newPage = window.open('/NewPage.html', '_blank');
    if (newPage) {
        // 在新页面加载后，执行回调函数，发送请求并填充表单
        newPage.onload = () => {
            // 在新页面中调用loadFormData()方法发送请求和填充表单
            newPage.postMessage(amount.value, '*');
        };
    }else{
        Notification.warning({
            title: '支付出现错误',
            content: '支付窗口跳转失败。',
        })
    }

    //在当前窗口显示对话框
    visible.value = true;
}
//

//点击对话框的ok和取消
const handleOk = () => {
    if (store.$state.order_id) {
        router.push('/dashboard/payment-result')
    }
    else {
        Notification.warning({
            title: '充值遇到问题',
            content: '支付还未完成就关闭窗口。',
        })
    }
}
const handleCancel = async () => {
    if (store.$state.order_id) {
        router.push('/dashboard/payment-result')
    }
    else {
        Notification.warning({
            title: '充值遇到问题',
            content: '支付还未完成就关闭窗口。',
        })
    }
}
//

//当前网页
onMounted(() => {
    window.addEventListener('message', (event) => {
        store.$state.order_id = event.data
    });
})
onUnmounted(() => {
    window.removeEventListener('message', (event) => {
        store.$state.order_id = event.data
    });
})

</script>
  
<style scoped lang="less"></style>
  