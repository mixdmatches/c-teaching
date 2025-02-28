<script setup>
import HelloWorld from '@/components/HelloWorld'
import UserInfo from './components/UserInfo.vue'
import service from './utils/request'
import MarkdonwViewer from '@/components/MarkdonwViewer.vue'
async function fn() {
  const res = await service.get('/paged-list')
  console.log(res)
}
fn()
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <UserInfo />
  <MarkdonwViewer />
</template>

<style scoped lang="scss">
#div {
  background-color: $primary-color;
}
</style>
