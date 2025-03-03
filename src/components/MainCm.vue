<template>
  <main></main>
 </template>

<script setup>
import {reactive} from "vue";
const userInfo = reactive({
  clazz: '',
  number: '',
  mobile: '',
  email: '' 
})
</script>

<style lang="scss" scoped>
main {
  width: 1200px;
  // 高度根据子盒子自适应
  height: auto;
  margin: 0 auto;
  background-color: $base-bg-color;
  padding: 150px 30px 30px;
}
</style>
