<template>
  <SubHeader title="测试中" exit-text="退出答题">
    <template #right>
      {{showTimeString}}
    </template>
  </SubHeader>
  <main>
    <el-scrollbar>
      <div class="questionBox">
        <QuestionItem v-for="(item,index) in questionList" v-model="questionList[index].selectId" :key="index" :option="item" />
      </div>
    </el-scrollbar>
  </main>
  <footer>
    <div class="footerBox">
      <div class="left">
<!--        <Pagination :total="questionList.length" class="pagination" />-->
        <div class="viewDotBox">
          <ProblemViewDot v-for="(item,index) in questionList" :value="questionList[index].selectId">
            {{item.no}}
          </ProblemViewDot>
        </div>
        <div class="tipBox">
          <div>
            <ProblemViewDot :value="1"></ProblemViewDot>
            <span>已做</span>
          </div>
          <div>
            <ProblemViewDot></ProblemViewDot>
            <span>未完成</span>
          </div>
        </div>
      </div>
      <LButton @click="() => router.push('/result')">提交</LButton>
    </div>
  </footer>
</template>

<script setup>
import SubHeader from "@/components/SubHeader.vue";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import QuestionItem from "@/views/question/components/QuestionItem.vue";
import LButton from "@/components/LButton.vue";
import {formatTime} from "@/utils/dateUtils.js";
import {useRouter} from "vue-router";
import ProblemViewDot from "@/components/problemViewDot.vue";

const router = useRouter();

const questionList = reactive([...new Array(15)].map((item,index) => {
  return{
    no: index+1,
    type: 'radio',
    difficulty: 3,
    emphasis: 4,
    tags: [
      {
        tagName: '循环',
      },
      {
        tagName: '数组',
      }
    ],
    title: '1.题目描述',
    options: [
      {
        id: 'A',
        text: '选项一'
      },
      {
        id: 'B',
        text: '选项一'
      },
      {
        id: 'C',
        text: '选项一'
      },
      {
        id: 'D',
        text: '选项一'
      }
    ],
    selectId: ''
  }
}))

const status = ref()

const time = ref(1)
const showTimeString = computed(() => {
  return formatTime(time.value)
})
const timeInterval = ref()
const startTiming = () => {
  timeInterval.value = setInterval(() => {
    time.value+=1
  },1000)
}
onMounted(() => {
  startTiming()
})
onUnmounted(() => {
  clearInterval(timeInterval.value)
})
</script>

<style lang="scss" scoped>
main{
  width: $main-width;
  height: calc(100vh - 228px);
  //height: 1000px;
  margin: 0 auto;
  .questionBox{
    display: flex;
    flex-direction: column;
    gap: $padding-xxl;
    padding-top: $padding-xxl;
  }
}
footer{
  background-color: $base-bg-color;
  padding: $padding-xxl 0;
  height: 128px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .footerBox{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    width: $main-width;
    margin: 0 auto;
    .left{
      display: flex;
      align-items: center;
      .viewDotBox{
        min-width: 200px;
        display: flex;
        gap: $padding-s;
      }
      .tipBox{
        display: flex;
        align-items: center;
        gap: $padding-xl;
        margin-left: 20px;
        &>div{
          display: flex;
          align-items: center;
          gap: $padding-s;
        }
      }
    }
  }
}
</style>
