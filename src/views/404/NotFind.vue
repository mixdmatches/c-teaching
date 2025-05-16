<template>
  <el-result title="" sub-title="">
    <template #icon>
      <el-image :src="empty" />
    </template>
    <template #extra>
      <el-button type="primary" @click="back()">Back</el-button>
    </template>
  </el-result>
</template>

<script setup>
import router from '../../router'
import empty from '@/assets/images/empty.png'
const back = () => {
  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
.el-empty__description {
  width: 400px;
}
</style>
