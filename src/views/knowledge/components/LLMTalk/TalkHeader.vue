<script setup>
const emits = defineEmits(['clearTalk'])

const handleClearTalk = () => {
  emits('clearTalk')
}
</script>

<template>
  <div class="right-top">
    <span class="title">ai对话</span>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="清空对话"
      placement="top"
    >
      <el-icon style="font-size: 1.6em" @click="handleClearTalk"
        ><Delete
      /></el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.right-top {
  background-color: $primary-color;
  padding: $padding-l;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  border-radius: $border-radius-s $border-radius-s 0 0;
  .title {
    font-size: $font-size-xl;
    flex: 1;
  }
}
</style>
