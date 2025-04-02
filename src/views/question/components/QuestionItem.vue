<script setup>
import Stars from "@/components/Stars.vue";
import Tag from "@/components/Tag.vue";
import { ref } from 'vue';
import LButton from '@/components/LButton.vue'
import { ElMessage } from "element-plus";

const props = defineProps({
  option: {
    type: Object,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  spentTime: {
    type: Number,
    required: true
  },
  resetTimer: {
    type: Function,
    required: true
  },
  isLastQuestion: {
    type: Boolean,
    default: false
  }
});
const model = ref(props.modelValue);
// 数据双向绑定
const emit = defineEmits(['update:modelValue']);
const showResult = ref(false);
const isCorrect = ref(false);

const checkAnswer = () => {
  showResult.value = true;
  isCorrect.value = model.value === props.correctAnswer;
  emit('update:modelValue', model.value);
  props.resetTimer();
  if (props.isLastQuestion) {
    ElMessage.success('已完成所有题目');
  }
};
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
        <Stars :num="option.hierarchy" />
      </div>

      <div class="tagBox">
        <Tag :text="option.knowPointName" />
      </div>
    </div>
    <div class="title">{{option.title}}</div>
    <el-radio-group v-model="model" class="radioGroup">
      <el-radio v-for="(item,index) in option.options" :key="index" :label="item.id + ':  ' + item.text" :value="item.id" />
    </el-radio-group>
    <!-- 添加提交按钮 -->
    <LButton class="submit" @click="checkAnswer">提交</LButton>
    <!-- 显示结果和解析 -->
    <div v-if="showResult" class="result">
      <p :style="{ color: isCorrect ? 'green' : 'red' }">
        {{ isCorrect ? '回答正确' : '回答错误' }}
      </p>
      <p>解析：{{ props.explanation }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.questionItem{
  width: 1200px;
  height: 400px;
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