<script setup>
import Stars from "@/components/Stars.vue";
import Tag from "@/components/Tag.vue";
import { onMounted, watch,ref } from "vue";

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
const options = ref("");
watch(
  () => props.option,
  (newVal, oldVal) => {
    if(newVal.id) {
        if(newVal.topicType == 0){
      options.value = newVal
      } else {
        let info = { ...newVal }
        let title = info.title.split("\\\\n");
        title.forEach((item,index) => {
          title[index] = item.replace(/\\\\\"/g, "");
          title[index] = item.replace('```', "");
          title[index] = item.replace(/\\\\\\/g, "");
          title[index] = item.replace(/\\\\/g, "")
          title[index] = item.replace(/\\/g, "")
        })
         options.value = {
          ...info,
          title:title
         }
      }
    }
   
  },
  {
    immediate: true
  }
)
onMounted(() => {
    
})
</script>

<template>
  <div class="questionItem">
    <div class="info">
      <div class="type">单选题</div>
      <div class="starBox">
        <div class="label">难度：</div>
        <Stars :num="options?.difficulty" />
      </div>
      <div class="starBox">
        <div class="label">重点：</div>
        <Stars :num="options?.hierarchy" />
      </div>
      <!-- <div class="tagBox">
        <Tag :text="option?.knowPointName" />
      </div> -->
    </div>
  
    <div v-if="options.topicType == 0">
       <div class="title">{{options?.title}}</div>
        <el-radio-group v-model="model" class="radioGroup" :disabled="disabled">
          <el-radio v-for="(item,index) in options?.option" :key="index" :label="item.key + ':  ' + item.value" :value="item.key" />
        </el-radio-group>
    </div>
    <div class="" v-else>
      <div class="title">
         <div v-for="(item,index) in options.title" :key="index" class="title_item">
          <span v-html="item"></span>
        </div>
        <div class="Answer">请输入答案:<el-input v-model="model" class="answerInput"></el-input></div>
      </div>
    </div>
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
.title_item{
  margin-bottom: 4px;
}
.Answer{
  display: flex;
  align-items: center;
  gap: $padding-s;
  margin-top: 20px;
}
.answerInput{
  width: 300px;
}
</style>