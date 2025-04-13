<script setup>
import Stars from "@/components/Stars.vue";
import Tag from "@/components/Tag.vue";

const props = defineProps({
  option: {
    type: Object,
    required: true
  },
  spentTime: {
    type: Number,
    required: false
  },
  resetTimer: {
    type: Function,
    required: false
  },
  isLastQuestion: {
    type: Boolean,
    default: false
  },
  disabled: Boolean
});
const model = defineModel()
</script>

<template>
  <div class="questionItem">
    <div class="info">
      <div class="type">单选题</div>
      <div class="starBox">
        <div class="label">难度：</div>
        <Stars :num="option?.difficulty" />
      </div>
      <div class="starBox">
        <div class="label">重点：</div>
        <Stars :num="option?.hierarchy" />
      </div>

      <div class="tagBox">
        <Tag :text="option?.knowPointName" />
      </div>
    </div>
    <div class="title">{{option?.title}}</div>
    <el-radio-group v-model="model" class="radioGroup" :disabled="disabled">
      <el-radio v-for="(item,index) in option?.option" :key="index" :label="item.key + ':  ' + item.value" :value="item.key" />
    </el-radio-group>
    <slot>

    </slot>
  </div>
</template>

<style scoped lang="scss">
.questionItem{
  float:left;
  width: 1000px;
  //height: 400px;
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
.submit {
  position: absolute;
  top: 270px;
  left: 40px;
}
.result {
  position: absolute;
  top: 260px;
  width: 100%;
  height: 100px;
  padding: $padding-xl;
  margin-top: $padding-xl;
  font-size: $margin-l;
  line-height: 25px;
  margin-top: 50px;
}
</style>