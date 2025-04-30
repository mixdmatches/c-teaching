<script setup>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  title: String,
  exitText: String,
  canBack: { type: Boolean, default: true },
})
</script>

<template>
  <header>
    <div>
      <div v-if="canBack" class="backBox" @click="() => router.push('/')">
        <el-icon :size="20"><ArrowLeftBold /></el-icon>
        <span>{{ props.exitText }}</span>
      </div>
    </div>
    <div class="title">{{ props.title }}</div>
    <div class="slot">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: $base-bg-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: $padding-xl 100px;
  height: $header-height;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .backBox {
    display: flex;
    align-items: center;
    font-size: $font-size-xxl;
    cursor: pointer;
  }
  .title {
    font-size: 1.5 * $font-size-xl;
  }
  .slot {
    font-size: $font-size-xxl;
  }
}

@media screen and (max-width: 768px) {
  header {
    padding: $padding-m;
    height: auto;
    min-height: 50px;
    grid-template-columns: 1fr auto 1fr;

    .backBox {
      font-size: $font-size-m;
      justify-content: flex-start;
    }

    .title {
      font-size: $font-size-l;
      text-align: center;
    }

    .slot {
      font-size: $font-size-m;
      justify-content: flex-end;
    }
  }
}
</style>
