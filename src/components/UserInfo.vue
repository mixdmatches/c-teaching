<script setup>
import { ref } from 'vue'
import api from '@/utils/request'

const userInfo = ref(null)
const loading = ref(false)

// 获取用户信息
const getUserData = async () => {
  try {
    loading.value = true
    const res = await api.get('/user')
    userInfo.value = res.data
  } finally {
    loading.value = false
  }
}

// 提交登录
const handleLogin = async () => {
  const { data } = await api.post('/login', {
    username: 'admin',
    password: '123456',
  })
  if (data.code === 0) {
    localStorage.setItem('token', data.token)
  }
}
</script>

<template>
  <button @click="getUserData" :disabled="loading">
    {{ loading ? '加载中...' : '获取用户信息' }}
  </button>

  <div v-if="userInfo" class="user-card">
    <img :src="userInfo.avatar" alt="头像" />
    <h3>{{ userInfo.name }}</h3>
    <p>年龄: {{ userInfo.age }}</p>
    <p>地址: {{ userInfo.address }}</p>
  </div>
</template>

<style scoped lang="scss">
.user-card {
  margin-top: 20px;
  text-align: center;
}

.user-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.button {
  padding: 8px 16px;

  &:hover {
    background-color: $primary-color;
  }
}
</style>
