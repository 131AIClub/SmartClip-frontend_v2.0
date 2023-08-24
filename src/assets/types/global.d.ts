export {}

declare global {
  type User = {
    userId: number
    username: string
    // point: number
    superUser: boolean
    freePoint: number
    lockPoint: number
  }

  type ClipRequirement = {
    videoType: number
    // clipStyle: number
    // clipLength: number
    // clipNum: number
    // otherRequirement: string
    maxClipNum: number
    templateId: number
  }

  type Task = {
    taskId: number
    taskStatus: number
    taskCreateTime: number
    clipRequirement: ClipRequirement
    videoId: number
    errorStage: number
    errorMessage: string
  }

  type Clip = {
    clipId: number
    clipVideoId: number
    distributed: boolean
    clipLength: number
    clipTitle: string
    clipDesc: string
    clipText: string
  }

  type Progress = {
    stage: number
    clippedNum: number
    totalClipNum: number
    failed: boolean
  }

  type LiveRoomInfo = {
    platform: number,
    live_room_id: string
  }

  type TaskLive = {
    taskId: number
    taskStatus: number
    recordStartTime: number
    recordEndTime: number
    liveRoomInfo: LiveRoomInfo
    remark: string
    errorMessage: string
    taskCreateTime: number
  }

  //获取所有live任务使用
  type GetTaskLive = {
    taskId: number
    taskStatus: number
    taskCreateTime: number
    remark: string
  }

  type CreditTask = {
    orderId: string
    amount: number
    status: number
  }

  type Transaction = {
    recordId: number
    point: number
    type: number
    typeString: string,
    transactionTime: number,
    creditOrderId: string
  }

  type Template = {
    templateId: number,
    templateName: string,
    desc: string
  }

  //此处加了一个视频数据的preview，但是该属性在接口文档中是没有的！！
  type VideoResource = {
    videoId: number,
    createTime: number,
    length: number,
    remark: string,
    source: number,
    videoPreview: string
  }
}
