<template>
  <main>
    <!-- 占位 -->
    <slot></slot>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
const userInfo = reactive({
  clazz: '',
  number: '',
  mobile: '',
  email: '',
})
</script>

<style lang="scss" scoped>
main {
  width: $main-width;
  // 高度根据子盒子自适应
  height: auto;
  margin: 0 auto;
  margin-top: calc($margin-xxl + $header-height);
}
</style>
