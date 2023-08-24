<!-- 这是全部直播录制任务的.vue文件 -->
<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <a-card title="全部任务" hoverable>

      <a-table :columns="columns" :data="tasks" :pagination="{ total, pageSize: pageSize, simple: true }"
        @row-click="toDetail" @page-change="pageChange" v-model:loading="loading"
        :size="store.is_mobile ? 'mini' : 'small'">

        <!-- 自定义创建时间的列 -->
        <template #taskCreateTime="{ rowIndex }">
          <div class="text-[10px] my-2">{{ date(tasks[rowIndex].taskCreateTime) }}</div>
        </template>

        <template #taskStatus="{ rowIndex }">
          <!-- 任务状态：-1表示任务失败，0表示任务未启动，1表示正在录制中，2表示任务已完成 -->
          <a-tag :color="['red', 'gold', 'blue', 'green',][tasks[rowIndex].taskStatus + 1]">
            {{ ["任务失败", "任务未启动", "正在录制中", "任务已完成"][tasks[rowIndex].taskStatus + 1] }}
          </a-tag>
        </template>

        <template #remark="{ rowIndex }">
          <div class="text-[10px] my-2">{{ tasks[rowIndex].remark }}</div>
        </template>

      </a-table>
    </a-card>
  </div>
</template>
  
<script setup lang="ts">
import { client } from "@/assets/lib/request";
import { ref } from "vue";
import { DateParser } from "@/assets/lib/utils";
import router from "@/router";
import { TableData } from "@arco-design/web-vue"
import { UseStore } from "@/store";

const store = UseStore()
store.loading = true

const page = ref(0)
const loading = ref(false)
const columns = ref<TableData[]>([
  {
    title: "ID",
    dataIndex: "taskId"
  },
  {
    title: "创建时间",
    dataIndex: "taskCreateTime",
    slotName: "taskCreateTime"
  },
  {
    title: "状态",
    dataIndex: "taskStatus",
    slotName: "taskStatus"
  },
  {
    title: "任务备注",
    dataIndex: "remark",
    slotName: "remark"
  }
])

const tasks = ref<GetTaskLive[]>([])
const total = ref<number>()
const pageSize = ref<number>(10)

const load = async () => {
  const res = await client.get<{ tasks: GetTaskLive[], total: number }>(
    { url: `live_record_task/?page_count=${pageSize.value}&page_num=${page.value}` }
  )
  total.value = res.data.total
  tasks.value = res.data.tasks
}

const date = (timestamp: number) => {
  return new DateParser(timestamp).all()
}

const toDetail = (task: TableData) => {
  router.push(`/dashboard/task-live/${task.taskId}`)
}

const pageChange = async (new_page: number) => {
  page.value = new_page - 1
  loading.value = true
  await load()
  loading.value = false
}

await load()
store.loading = false

</script>
  
<style scoped lang="less"></style>
  