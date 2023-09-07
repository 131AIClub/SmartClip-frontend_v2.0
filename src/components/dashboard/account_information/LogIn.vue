<!-- 这是登录页面的.vue文件 -->
<template>
    <div>
        <div class="flex justify-center items-center h-screen bg-black " >

            <!-- 设置垂直间距 列宽统一设定为600px -->
            <div v-if="!registerPage" class="fixed"><!-- 登录页面 -->
                <a-space direction="vertical" fill align="center">
                    <div class="font-bold text-4xl text-white">
                        登录
                    </div>

                    <div class="h-[2vh]"></div>

                    <el-button class=" text-1.5xl " size="large" round color="#fffffb" :style="{ width: '600px' }">
                        <icon-tiktok-color />
                        &nbsp;使用抖音/tiktok账号登录
                    </el-button>

                    <div class="h-[1.5vh]"></div>

                    <a-form :model="signInForm" layout="vertical">
                        <a-form-item label="用户名:" >
                            <a-input v-model="signInForm.username" size="large" allow-clear :style="{ width: '600px' }"
                                placeholder="你的用户名" />
                        </a-form-item>
                        <a-form-item label="密码:">
                            <a-input-password v-model="signInForm.password" size="large" allow-clear
                                :style="{ width: '600px' }" placeholder="你的密码" />
                        </a-form-item>
                    </a-form>

                    <a-button class="bg-white text-black text-1.5xl" size="large" shape="round"  :style="{ width: '600px' }"
                        @click="toSignIn"
                        :disabled="!fullMap(signInForm)"
                        >
                        登录
                    </a-button>

                    <div class="h-[1vh]"></div>

                    <a-link class="underline" style="color: #d9d6c3" @click="changePage">没有账号？点击注册</a-link>

                    <!-- 忘记密码的逻辑暂时还没实现捏 -->
                    <a-link class="underline" style="color: #d9d6c3" disabled>忘记密码？</a-link>

                </a-space>
            </div>

            <div v-else class="fixed"><!-- 注册页面 -->
                <a-space direction="vertical" fill align="center">
                    <div class="font-bold text-4xl ">
                        注册
                    </div>

                    <div class="h-[1.5vh]"></div>


                    <el-button class=" text-1.5xl " size="large" round color="#fffffb" :style="{ width: '600px' }">
                        <icon-tiktok-color />
                        &nbsp;使用抖音/tiktok账号登录
                    </el-button>

                    <div class="h-[1.5vh]"></div>

                    <a-form :model="signUpForm" layout="vertical">
                        <a-form-item label="用户名:">
                            <a-input v-model="signUpForm.username" size="large" allow-clear :style="{ width: '600px' }"
                                placeholder="你的用户名" />
                        </a-form-item>
                        <a-form-item label="输入密码:">
                            <a-input-password v-model="signUpForm.password" size="large" allow-clear
                                :style="{ width: '600px' }" placeholder="你的密码" />
                        </a-form-item>
                        <a-form-item label="确认密码:">
                            <a-input-password v-model="signUpForm.confirmPassword" size="large" allow-clear
                                :style="{ width: '600px' }" placeholder="确认密码" />
                        </a-form-item>
                    </a-form>

                    <a-button class="bg-white text-black text-1.5xl" size="large" shape="round" :style="{ width: '600px' }"
                        @click="toSignUp"
                        :disabled="!fullMap(signUpForm)">
                        注册
                    </a-button>

                    <div class="h-[1vh]"></div>

                    <a-link class="underline" style="color: #d9d6c3" @click="changePage">已有账号？点击登录</a-link>
                </a-space>
            </div>

        </div>

    </div>
</template>
  
<script setup lang="ts">
import { UseStore } from "@/store";
import { onMounted, ref } from "vue";
import { fullMap } from "@/assets/lib/utils";
import { client } from "@/assets/lib/request";
import { Notification } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const store = UseStore()
const route = useRoute()
const router = useRouter()
const registerPage = ref(false)//展示注册页面

//修改主题配色
onMounted(() => {
    store.$state.dark = true
})
//

const signInForm = ref({//登录表单
    username: '',
    password: ''
})

const signUpForm = ref({//注册表单
    username: '',
    password: '',
    confirmPassword: ''
})


//切换登录注册
const changePage = () => {
    registerPage.value = !(registerPage.value)
}
//

//登录
const toSignIn = async () => {
    const res = await client.post<{ token: string, user: User }>({
        url: "user/login/",
        data: signInForm.value
    })
    if (res.code === 114) {
        store.user = res.data.user
        store.is_login = true
        localStorage.setItem("token", res.data.token)
        // store.show_sign_page = false
        // const next = route.query.next && (typeof route.query.next === "string" ? route.query.next : route.query.next[0])
        // if (next) await router.push(next)

        ElMessage({
            type: "success",
            message: "登录成功！",
            center: true,
            duration: 1000
        })

        router.push("/")
    } else {
        Notification.error({
            content: res.msg,
            closable: true,
            duration: 1000000,
        })
    }
}
//

//注册
const toSignUp = async () => {
    if (signUpForm.value.confirmPassword !== signUpForm.value.password) {
        Notification.warning({
            title: '注册失败',
            content: '两次密码不一致',
        })
        return
    }

    const res = await client.post<{ token: string, user: User }>({
        url: "user/",
        data: signUpForm.value
    })

    if (res.code === 114) {
        store.user = res.data.user
        store.is_login = true
        localStorage.setItem("token", res.data.token)
        // store.show_sign_page = false
        // const next = route.query.next && (typeof route.query.next === "string" ? route.query.next : route.query.next[0])
        // if (next) await router.push(next)

        ElMessage({
            type: "success",
            message: "注册成功！",
            center: true,
            duration: 1000
        })

        router.push("/")
    } else {
        Notification.error({
            content: res.msg,
            closable: true,
            duration: 1000000,
        })
    }
}
//

</script>
  
<style scoped lang="less"></style>
  