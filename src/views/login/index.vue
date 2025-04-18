<template>
  <div class="login-bk">
    <div class="login-form">
      <h2>登录</h2>
      <el-form
        :rules="rules"
        :model="formData"
        label-width="auto"
        label-position="top"
      >
        <el-form-item label="学号" prop="studentId">
          <el-input
            :prefix-icon="User"
            placeholder="请输入学号"
            v-model="formData.studentId"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
            show-password
            v-model="formData.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin" type="primary" class="full-width-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index'
import { apiPostLogin } from '@/api/user'
import router from '../../router'
const userStore = useUserStore()
const formData = ref({
  studentId: '',
  password: '',
})
const rules = {
  studentId: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
// 登录按钮点击事件
const handleLogin = async () => {
  const {
    data: { jwt, authority },
  } = await apiPostLogin(formData.value)
  localStorage.setItem('token', jwt)
  localStorage.setItem('authority', authority)
  userStore.setUserInfo({ ...formData.value })
  router.push('/')
}
</script>

<style lang="scss" scoped>
.full-width-btn {
  width: 100%; // 让按钮宽度占满父容器
  text-align: center; // 让按钮内文字居中
}
.login-bk {
  width: 100%;
  height: 100vh;
  background: url(https://file.moyublog.com/free_wallpapers_files/tstk2al2n3m.jpg)
    no-repeat;
  .login-form {
    display: flex;
    flex-direction: column;
    gap: $margin-l;
    align-items: stretch;
    justify-content: center;
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h2 {
      text-align: center;
      font-size: $font-size-xl * 2;
      color: $primary-color;
      font-family: monospace;
    }
  }
}
</style>
