<script setup>
import Stars from "@/components/Stars.vue";
import Tag from "@/components/Tag.vue";

const props = defineProps({
  option: {required:true}
});
const model = defineModel()
</script>

<template>
  <div class="questionItem">
    <div class="info">
      <div class="type">{{option.type === 'radio' ? '单选题' : ''}}</div>
      <div class="starBox">
        <div class="label">难度：</div>
        <Stars :num="option.difficulty" />
      </div>
      <div class="starBox">
        <div class="label">重点：</div>
        <Stars :num="option.emphasis" />
      </div>

      <div class="tagBox">
        <Tag v-for="(item,index) in option.tags" :key="index" :text="item.tagName" />
      </div>
    </div>
    <div class="title">{{option.title}}</div>
    <el-radio-group v-model="model" class="radioGroup">
      <el-radio v-for="(item,index) in option.options" :key="index" :label="item.text" :value="item.id" />
    </el-radio-group>
  </div>
</template>

<style scoped lang="scss">
.questionItem{
  background-color: $base-bg-color;
  border-radius: $border-radius-m;
  padding: $padding-xl;
  .info{
    display: flex;
    align-items: center;
    gap: $padding-xxl;
    .type{
      background-color: $primary-color;
      color: white;
      font-size: $font-size-xl;
      padding: $padding-s;
      border-radius: 9999px;
    }
    .starBox{
      display: flex;
      align-items: center;
      .label{
        color: $primary-color;
        font-size: $font-size-xxl;
      }
    }
    .tagBox{
      display: flex;
      align-items: center;
      gap: $padding-s;
    }
  }
  .title{
    margin: $padding-xl 0;
    color: $primary-color;
    font-size: $font-size-xxl;
  }
  .radioGroup{
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 20px;
  }
}
</style>