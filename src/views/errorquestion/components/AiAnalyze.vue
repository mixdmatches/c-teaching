<template>
  <el-card shadow="never" style="margin-top: 20px">
    <template #header>
      <h2>{{ isLoading ? 'ai分析中' : 'ai分析结果' }}</h2>
    </template>
    <div
      v-loading="isLoading"
      element-loading-text="ai分析中..."
      class="ai-content"
      :style="{ height: isLoading ? '150px' : 'auto' }"
    >
      <div class="item" v-for="item in aiAnaArr" :key="item">
        <h5>{{ item.title }}</h5>
        <p>{{ item.contentText }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { apiGetAiAnalyze } from '@/api/aiTalk'
const aiAnaArr = ref([])
const isLoading = ref(false)
const getAnalyze = async () => {
  isLoading.value = true
  const res = await apiGetAiAnalyze()
  aiAnaArr.value = JSON.parse(res)
  isLoading.value = false
}
getAnalyze()
</script>

<style lang="scss" scoped>
h2 {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-feature-settings: 'kern' on;
  color: #000000;
}
.ai-content {
  display: flex;
  gap: 0px 10px;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: $margin-l;
  .item {
    &:nth-child(1) {
      background-color: #eef2ff;
    }
    &:nth-child(2) {
      background-color: #f0fdf4;
    }
    &:nth-child(3) {
      background-color: #fef3c7;
    }
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 10px;
    flex-wrap: wrap;
    align-content: flex-start;
    border-radius: $border-radius-m;
    h5 {
      font-family: Roboto;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      font-feature-settings: 'kern' on;
      color: #000000;
    }
    p {
      font-family: Roboto;
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
      font-feature-settings: 'kern' on;
      color: #4b5563;
    }
  }
}
</style>
