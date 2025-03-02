<template>
  <main>
    <!-- 占位 -->
    <slot></slot>
  </main>
</template>

<script setup></script>

<style lang="scss" scoped>
main {
  width: $main-width;
  // 高度根据子盒子自适应
  height: auto;
  margin: 0 auto;
  border: 1px solid red;
  margin-top: $margin-xxl;
}
</style>
