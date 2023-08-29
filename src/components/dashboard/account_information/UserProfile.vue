<!-- 这是用户个人信息的.vue文件 -->
<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <div class="py-8 flex flex-col justify-center items-center back-image gap-2">

      <a-avatar class="h-16 w-16">
        <img alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" 
          />
      </a-avatar>

      <div class="text-lg">{{ user.username }}</div>

      <div class="flex justify-center items-center gap-4">
        <i-quill-vip class="text-xl text-[rgb(var(--gold-7))]" />
        <div class="flex justify-center items-center text-[rgb(var(--green-7))]">
          <i-ant-design-dollar-outlined class="text-sm" />
          {{ user.freePoint ? user.freePoint : 0 }}
        </div>
      </div>

      <div class="flex justify-end items-center">
        <a-popconfirm content="确认退出登录？" @ok="logout">
          <a-button status="warning">退出登录</a-button>
        </a-popconfirm>
      </div>
    </div>

    <div class="flex flex-col md:flex-row-reverse gap-2">
      <!-- <a-card class="w-full md:w-[70%]" title="数据统计">
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in
        China and around the world. Toutiao started out as a news recommendation
        engine and gradually evolved into a platform delivering content in various
        formats.
      </a-card> -->

      <a-card class="w-full" title="用户使用记录">
        这里将以统计图的形式来展示用户使用记录
      </a-card>

    </div>

    <div class="flex flex-col gap-2 md:gap-4">
      <a-card title="个人交易明细" hoverable>

        <a-table :columns="columns" :data="transactions" :pagination="{ total, pageSize: page_size, simple: true }"
          @row-click="" @page-change="pageChange" v-model:loading="loading" :size="store.is_mobile ? 'mini' : 'small'">

          <template #recodeId="{ rowIndex }">
            <div>{{ transactions[rowIndex].recordId }}</div>
          </template>

          <!-- <template #point="{ rowIndex }">
            <div>{{ transactions[rowIndex].point }}</div>
          </template> -->
          <template #point="{ rowIndex }">
            <div>{{ addSymbol(transactions[rowIndex].point) }}</div>
          </template>

          <template #type="{ rowIndex }">
            <a-tag :color="['blue', 'green'][transactions[rowIndex].type]">
              {{ ["剪辑消耗", "积分充值"][transactions[rowIndex].type] }}
            </a-tag>
          </template>

          <template #transactionTime="{ rowIndex }">
            <div class="text-[10px] my-2">{{ date(transactions[rowIndex].transactionTime) }}</div>
          </template>
        </a-table>



      </a-card>
    </div>

  </div>
</template>

<script setup lang="ts">
import { UseStore } from "@/store";
import { assertNotEmpty } from "@/assets/lib/utils";
import { ref,computed } from "vue";
import { useRouter } from "vue-router";
import { client } from "@/assets/lib/request";
import { TableData } from "@arco-design/web-vue"
import { DateParser } from "@/assets/lib/utils";

const store = UseStore()
const router = useRouter()
const user = ref(assertNotEmpty(store.user, "用户未初始化"))

const logout = () => {
  router.push("/")
  localStorage.removeItem("token")
  store.user = null
  store.is_login = false
}

//以下是展示交易明细的相关代码
store.loading = true

const page = ref(0)
const loading = ref(false)
const columns = ref<TableData[]>([
  {
    title: "交易ID",
    dataIndex: "recodeId",
    slotName: "recodeId"
  },
  {
    title: "积分变化",
    dataIndex: "point",
    slotName: "point"
  },
  {
    title: "交易事件",
    dataIndex: "type",
    slotName: "type"
  },
  {
    title: "交易时间",
    dataIndex: "transactionTime",
    slotName: "transactionTime"
  }
])
const transactions = ref<Transaction[]>([])
const total = ref<number>()
const page_size = ref<number>(10)
const load = async () => {
  const res = await client.get<{ transactions: Transaction[], total: number }>(
    { url: `transaction/?page_count=${page_size.value}&page_num=${page.value}` }
  )
  total.value = res.data.total
  transactions.value = res.data.transactions
}
const date = (timestamp: number) => {
  return new DateParser(timestamp).all()
}

//计算积分增减
// const pointChange = computed(() => {
//   if(transactions.value.)
// })

// const toDetail = (task: TableData) => {
//   router.push(`/dashboard/task/${task.taskId}`)
// }

const pageChange = async (new_page: number) => {
  page.value = new_page - 1
  loading.value = true
  await load()
  loading.value = false
}

//积分变化显示加号和减号
const addSymbol = (point: number) => {
  if(point>0)
    return '+'+point
  else
    return point.toString()
}

await load()
store.loading = false

</script>

<style scoped lang="less">
.back-image {
  background-size: cover !important;
  background: url(https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image) no-repeat;
}
</style>
