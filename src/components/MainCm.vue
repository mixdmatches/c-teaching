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
  height: auto;
  margin: 0 auto;
  margin-top: $margin-xxl;
  margin-bottom: $header-height;
}
</style>
