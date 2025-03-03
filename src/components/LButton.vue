<script setup>
defineProps({
  border: {type: Boolean, default: false},
})
</script>

<template>
  <button :class="{['border']:border}">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button{
  background-color: #1677ff;
  color: white;
  padding: 8px 16px 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: $font-size-xxl;
  border: none;
  box-sizing: border-box;
  &.border{
    background-color: #e5f1fc;
    border: 1px solid #A3D0FD;
    color: #1870F8;
  }
}
</style>