<script setup>
import { apiPostChapterAi, apiPostTopicAi } from '@/api/aiTalk'
import { onMounted, ref } from 'vue'
// 测试生成题目--全是章节相关的
const question = ref([])
const getChapterTimu = async () => {
  const content = await apiPostChapterAi(8, 2) //第八章，2道题
  question.value = JSON.parse(content)
  console.log(question.value, 'zhipures1')
}
// 测试生成题目--全是章节下某一知识点相关的
const question2 = ref([])
const getTopicTimu = async () => {
  const topics = await apiPostTopicAi(5, 1, 4) //第五章，第一个知识点，4个题
  question2.value = JSON.parse(topics)
  console.log(question2.value, 'zhipures2')
}
onMounted(() => {
  // getChapterTimu()
  // getTopicTimu()
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
