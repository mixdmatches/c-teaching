<template>
  <el-result title="" sub-title="">
    <template #icon>
      <el-image src="https://static.hdslb.com/error/very_sorry.png" />
    </template>
    <template #extra>
      <el-button type="primary" @click="back()">Back</el-button>
    </template>
  </el-result>
</template>

<script setup>
const back = () => {
  window.history.back()
}
</script>

<style lang="scss" scoped>
.el-empty__description {
  width: 400px;
}
</style>
