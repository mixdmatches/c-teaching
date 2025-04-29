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
  margin-top: $margin-xl;
  margin-bottom: $header-height;
}
@media screen and (max-width: 768px) {
  main {
    width: auto;
  }
}
</style>
