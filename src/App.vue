<script setup>
import { apiPostTopicAi } from '@/utils/aiAPI/zhipuConfig'
import { onMounted, ref } from 'vue'
// 测试生成题目
// const question = ref([])
// const talk = async () => {
//   const content = await apiPostTopicAi(8, 1, 2) //第十章，第三个知识点，2道题
//   question.value = JSON.parse(content)
//   console.log(question.value, 'zhipures')
// }
// onMounted(() => {
//   talk()
// })
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
