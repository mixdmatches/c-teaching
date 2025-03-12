<script setup>
import Stars from "@/components/Stars.vue";
import Tag from "@/components/Tag.vue";
import CircleProgress from "@/components/CircleProgress.vue";
import {Check} from "@element-plus/icons-vue";

const props = defineProps({
  option: {required:true}
});
const model = defineModel()
const getRadioClassName = (key) =>{
  if (props.option.studentAnswer === key){
    if (props.option.answer === key){
      return 'right'
    }else {
      return 'error'
    }
  }else if (props.option.answer === key){
    return 'right'
  }else {
    return ''
  }
}
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
        <Tag v-for="(item,index) in option.tags" :key="index" :text="item.tagName" />
      </div>
    </div>
    <div class="title">{{option.title}}</div>
    <el-radio-group v-model="model" class="radioGroup">
      <el-radio :class="getRadioClassName(item.key)" v-for="(item,index) in option.option" :key="index" :label="item.value" :value="item.key" />
    </el-radio-group>

    <div class="analysisBox">
      <div class="top">
        <span>正确答案:{{option.answer}}</span>
        <span>你的答案:{{option.studentAnswer}}</span>
      </div>
      <div>
        AI解析:{{option.AIAnalysis}}
      </div>
    </div>
    <CircleProgress class="progress" :size="44" :border-width="6" :progress="70" v-if="option.answer !== option.studentAnswer">!</CircleProgress>
    <CircleProgress class="progress" :size="44" :border-width="6" :progress="70" v-else color="#52c41a" ><el-icon><Check /></el-icon></CircleProgress>
  </div>

</template>

<style scoped lang="scss">
.questionItem{
  background-color: $base-bg-color;
  border-radius: $border-radius-m;
  padding: $padding-xl;
  position: relative;
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
    pointer-events: none;
    .el-radio{
      :deep(.el-radio__input){
        .el-radio__inner::after{
          transform: translate(-50%, -50%) scale(1);
        }
      }
      &.error{
        :deep(.el-radio__input){
          .el-radio__inner{
            background-color: #ff0000;
            border: none;
          }
        }
      }
      &.right{
        :deep(.el-radio__input){
          .el-radio__inner{
            background-color: #00ff52;
            border: none;
          }
        }
      }
    }
  }
  .progress{
    position: absolute;
    top: 20px;
    right: 100px;
  }
  .analysisBox{
    font-size: $font-size-xxl;
    border-radius: $border-radius-m;
    background-color: #f2f3f5;
    padding: $padding-xxl;
    display: flex;
    flex-direction: column;
    gap: 2 * $padding-xl;
    margin-top: 30px;
    .top{
      display: flex;
      gap: 2 * $padding-xl;
    }
  }
}
</style>