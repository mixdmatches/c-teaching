<script setup>
import {ArrowLeftBold} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
const router = useRouter()
const props = defineProps({
  title: String,
  exitText: String,
  canBack: {type: Boolean, default: true}
});
</script>

<template>
  <header>
    <div>
      <div class="backBox" @click="() => router.back()" v-if="canBack">
        <el-icon :size="20"><ArrowLeftBold /></el-icon>
        <span>{{props.exitText}}</span>
      </div>
    </div>
    <div class="title">{{props.title}}</div>
    <div class="slot">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: $base-bg-color;
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0 auto;
  padding: $padding-xl 100px;
  height: $header-height;
  &>div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .backBox{
    display: flex;
    align-items: center;
    font-size: $font-size-xxl;
    cursor: pointer;
  }
  .title{
    font-size: 1.5 * $font-size-xl;
  }
  .slot{
    font-size: $font-size-xxl;
  }
}
</style>