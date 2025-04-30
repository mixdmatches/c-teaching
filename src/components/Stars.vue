<script setup>
import { Star, StarFilled } from '@element-plus/icons-vue'

defineProps({
  num: { type: Number, required: true },
  max: { type: Number, required: false, default: 5 },
})
</script>

<template>
  <div class="stars">
    <span v-for="(item, index) in num" :key="index" class="active star">
      <el-icon><StarFilled /></el-icon>
    </span>
    <span
      v-for="(item, index) in (max ?? 0) - (num ?? 0)"
      :key="index + num"
      class="star"
    >
      <el-icon><Star /></el-icon>
    </span>
  </div>
</template>

<style scoped lang="scss">
.stars {
  display: flex;
  align-items: center;
  gap: $padding-s;
  .star {
    font-size: $font-size-xl;
    color: $info-color;
    &.active {
      color: #ffda00;
    }
  }
}
</style>
