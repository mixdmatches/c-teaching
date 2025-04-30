<template>
  <div class="left-study">
    <!-- 学习时长 -->
    <div class="study-time">
      <span class="time-header">学习时长</span>
      <span class="time">{{ formattedStudyTime }}</span>
    </div>
    <!-- 推荐学习 -->
    <div class="study-recommend">
      <span class="recommend-header">推荐学习</span>
      <ul>
        <a
          href="https://juejin.cn/post/6892199770106888199?searchId=202503231848084FC53F1486D15F276CEA"
          target="_blank"
          >C语言重点——指针篇（一文让你完全搞懂指针）</a
        >
        <a
          href="https://juejin.cn/post/7317844669228695587?searchId=202503231858287EB9E6C0F622602EC3F6"
          target="_blank"
          >深入解析 C 语言中的 for 循环、break 和 continue</a
        >
        <a
          href="https://juejin.cn/post/7239715208791736376?searchId=20250323190133350B50620458903FA56A"
          target="_blank"
          >C语言编程-结构体</a
        >
        <a
          href="https://juejin.cn/post/7033711811006464030?searchId=202503231903006C5AAC599A4B8E37E9EB"
          target="_blank"
          >漫谈C语言内存管理</a
        >
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/index'
const userStore = useUserStore()
// 定义在线学习时间
const studyTime = ref(0)
let timer = null

// 格式化时间函数
const formatTime = seconds => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

// 计算属性，返回格式化后的时间
const formattedStudyTime = computed(() => formatTime(studyTime.value))
// 在组件挂载后启动计时器
onMounted(() => {
  timer = setInterval(() => {
    studyTime.value++
  }, 1000)
})

// 在组件卸载前清除计时器
onUnmounted(() => {
  const studyTimeValue = parseInt(studyTime.value) // 确保 studyTime 是数字类型
  userStore.changeTotalTime(studyTimeValue)
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style lang="scss" scoped>
.left-study {
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $margin-l;
}
.study-time {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  border-radius: $border-radius-s;
  .time-header {
    color: $primary-color;
    font-size: 20px;
    font-weight: bold;
  }
  .time {
    font-size: 24px;
    font-weight: bold;
  }
}
.study-recommend {
  width: 100%;
  background-color: white;
  border-radius: $border-radius-s;
  padding: $padding-l;
  .recommend-header {
    color: $primary-color;
    font-size: $font-size-m * 2;
    font-weight: bold;
    margin: 10px;
  }
  ul {
    width: 100%;
    margin-top: $margin-l;
    a {
      padding: 10px;
      // border-bottom: 1px solid #ccc;
      color: #333;
      text-decoration: none;
      font-size: $font-size-m;
      // 单行文本溢出省略号
      white-space: nowrap; // 禁止文本换行
      overflow: hidden; // 隐藏溢出的内容
      text-overflow: ellipsis; // 用省略号表示溢出的文本
      display: block; // 使 a 标签以块级元素显示，确保样式生效
      &:hover {
        color: $primary-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .left-study {
    width: 100%;
    height: auto;
  }

  .study-recommend ul a {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}
</style>
