<script setup>
import HelloWorld from '@/components/HelloWorld'
import UserInfo from './components/UserInfo.vue'
import service from './utils/request'
async function fn() {
  const res = await service.get('/paged-list')
  console.log(res)
}
fn()
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <UserInfo />
</template>

<style scoped lang="scss">
#div {
  background-color: $primary-color;
}
</style>
