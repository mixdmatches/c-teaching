<script setup>
defineProps({
  border: { type: Boolean, default: false },
})
</script>

<template>
  <button :class="{ ['border']: border }">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  background-color: #1677ff;
  color: white;
  padding: 8px 16px 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: $font-size-xxl;
  border: none;
  box-sizing: border-box;
  &.border {
    background-color: #e5f1fc;
    border: 1px solid #a3d0fd;
    color: #1870f8;
  }
}

@media screen and (max-width: 768px) {
  button {
    padding: 6px 12px;
    font-size: $font-size-l;
  }
}
</style>
