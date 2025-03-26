<script setup>
import {
  apiPostChapterAi,
  apiPostTopicAi,
  apiPostProficiencyAi,
} from '@/api/aiTalk'
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
  // 等有题目后调用熟练度接口
  await getProficiency()
}
// 测试生成熟练度
const proficiencyObj = ref({})
const getProficiency = async () => {
  const data = await apiPostProficiencyAi(question2.value, 'C')
  console.log(data, 'zhipures3')
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
