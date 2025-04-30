<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: [String, Boolean],
  completeColor: { type: String, default: '#1890ff' },
  incompleteColor: { type: String, default: '#c4c4c4' },
  errorColor: { type: String, default: '#ff0000' },
  error: { type: Boolean, default: false },
  index: { type: Number, required: true },
})
const color = computed(() => {
  if (props.error) {
    return props.errorColor
  }
  if (props.value) {
    return props.completeColor
  } else {
    return props.incompleteColor
  }
})
// 定义事件
const emit = defineEmits(['dot-click'])
// 点击事件处理
const handleClick = () => {
  emit('dot-click', props.index)
}
</script>

<template>
  <div class="dot" :style="{ backgroundColor: color }" @click="handleClick">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
