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
    maxClipNum: number
  }

  type Task = {
    taskId: number
    taskStatus: number
    taskRemark: string
    previewUrl: string
    
    taskCreateTime: number
    clipRequirement: ClipRequirement
    videoId: number
    errorMessage: string
    taskRemark: string
    videoSourceInfo: VideoSourceInfo
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
    previewImageUrl: string,
    previewVideoUrl: string,
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

  type VideoSourceInfo = {
    source: number,
    downloadUrl: string,
    liveRoomRecordTask: LiveRoomRecordTask
  }

  type LiveRoomRecordTask = {
    liveRoomPlatform: number,
    liveRoomId: string,
    recordStartTime: number,
    recordEndTime: number
  }

  //这个类是用来响应创建任务的，接口文档中并没有，详情见https://github.com/QZero233/SmartClipFrontendComponents/blob/main/NewTask.md
  type Result = {
    source: number,
    url: string,
    video: File,
    videoType: number,
    startTime: number,
    endTime: number,
    maxClipNum: number
  }
}
