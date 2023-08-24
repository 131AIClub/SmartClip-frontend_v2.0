<!-- 这是底部栏栏的.vue文件 ！！注意：现在没有使用该文件-->
<template>
    <div class="bg-white">

        <div class="h-[20vh] md:h-[5vh]"></div>
        <hr>
        <div class="h-[20vh] md:h-[1vh]"></div>

        <div class="bg-white">
            <el-row :gutter="20" justify="space-evenly">
                <el-col :span="4" class="text-center" >
                <div class="grid-content flex items-center justify-center">
                  <el-image class="w-[200%] h-[200%]" src="logo_with_word.jpg" />
                </div>
                </el-col>

                <el-col :span="4" class="text-center">
                <div class="grid-content ep-bg-purple ">
                    <span class="text-3xl font-bold">友情链接</span>
                    <br>
                    <ul >
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700"><a href="http://www.baidu.com">百度</a></li>
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700" ><a href="http://www.baidu.com">百度</a></li>
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700"><a href="http://www.baidu.com">百度</a></li>
                    </ul>
                </div>
                </el-col>
                <el-col :span="4" class="text-center ">
                <div class="grid-content ep-bg-purple ">
                    <span class="text-3xl font-bold">关于我们</span>
                    <br>
                    <ul >
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700"><a href="http://www.baidu.com">百度</a></li>
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700" ><a href="http://www.baidu.com">百度</a></li>
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700"><a href="http://www.baidu.com">百度</a></li>
                    </ul>
                </div>
                </el-col>
                
                <el-col :span="4" class="text-center">
                <div class="grid-content ep-bg-purple ">
                    <span class="text-3xl font-bold">更多动态</span>
                    <br>
                    <ul >
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700"><a href="http://www.baidu.com">百度</a></li>
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700" ><a href="http://www.baidu.com">百度</a></li>
                        <li class="my-6 text-xl text-gray-500 hover:text-gray-700"><a href="http://www.baidu.com">百度</a></li>
                    </ul>
                </div>
                </el-col>
            </el-row>
        </div>

      <div class="h-[20vh] md:h-[5vh]"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped lang="less">
  .el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
  </style>
  