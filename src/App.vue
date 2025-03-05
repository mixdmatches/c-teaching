<script setup>
// 测试
import { apiGetUserInfo, apiPostLogin } from '@/api/user'
const login = async () => {
  const res = await apiPostLogin({
    username: 'admin',
    password: 'admin',
  })
  console.log(res, 'res-mock')
}
login()
const getUserInfo = async () => {
  const res = await apiGetUserInfo()
  console.log(res, 'res-mock')
}
getUserInfo()
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
