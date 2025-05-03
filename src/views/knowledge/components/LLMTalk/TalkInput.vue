<script setup>
import { ref } from 'vue'

// 定义输入框内容
const question = ref('')
// 加载状态
const isLoading = ref(false)

// 定义可触发的事件
const emits = defineEmits(['send-question'])

// 处理发送消息
const handleSendQuestion = () => {
  if (question.value.trim()) {
    isLoading.value = true
    emits('send-question', question.value)
    question.value = ''
    isLoading.value = false
  }
}
</script>

<template>
  <div class="right-bottom">
    <el-input
      v-model="question"
      size="large"
      placeholder="请输入问题"
      @keyup.enter="handleSendQuestion"
    ></el-input>
    <el-button
      :icon="isLoading ? 'Loading' : 'Promotion'"
      size="large"
      :disabled="!question.trim()"
      @click="handleSendQuestion"
    ></el-button>
  </div>
</template>

<style scoped lang="scss">
.right-bottom {
  display: flex;
  gap: 0.5em;
  background-color: rgb(240, 244, 251);
  padding: $padding-m;
  border-radius: 0 0 $border-radius-s $border-radius-s;
}
</style>
