<template>
  <HeaderCm />
  <SubHeader title="测试中" exit-text="退出答题">
    <template #right>
      {{ showTimeString }}
    </template>
  </SubHeader>
  <main>
    <div class="questionBox">
      <QuestionItem
        v-model="answer"
        :option="question"
        :disabled="submitted"
      >
        <div class="answer" v-if="submitted">
          <div class="judge">正确答案:{{result?.showTopicResponses[0]?.answer}};你的答案:{{result?.showTopicResponses[0]?.studentAnswer}}</div>
          <div class="analysis">AI:解析:{{result?.showTopicResponses[0]?.analysis}}</div>
        </div>
        <div style="display: flex;justify-content: right">
          <el-button :disabled="!answer || submitted" @click="submit">提交</el-button>
          <el-button :disabled="!submitted" @click="nextQuestion">下一题</el-button>
        </div>
      </QuestionItem>
    </div>
  </main>
  <div class="LL-Talk">
    <LLMTalk style="height: 450px" />
  </div>
  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot
            v-for="(status, index) in questionStatus"
            :key="index"
            :value="status"
          >
            {{ index + 1 }}
          </ProblemViewDot>
        </div>

        <!-- 提示信息模块 -->
        <div class="tipBox">
          <div>
            <ProblemViewDot :value="true"></ProblemViewDot>
            <span>已做</span>
          </div>
          <div>
            <ProblemViewDot :value="false"></ProblemViewDot>
            <span>未完成</span>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>

<script setup>
import SubHeader from '@/components/SubHeader.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import QuestionItem from '@/views/question/components/QuestionItem.vue'
import { formatTime } from '@/utils/dateUtils.js'
import { useRoute } from 'vue-router'
import { getAnswer, getNextQuestion } from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'
import HeaderCm from '@/components/HeaderCm.vue'
import { to404 } from '@/router/index.js'
import LLMTalk from '@/views/knowledge/components/LLMTalk'
import ProblemViewDot from '@/components/problemViewDot.vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const route = useRoute()

// 题目
const question = ref()
// 答案
const answer = ref()
// 是否已提交
const submitted = ref(false)
// 结果
const result = ref()
// 题目的回答状态
const questionStatus = ref(Array(10).fill(false));
// 答题数量
const count = ref(1);

// 时间相关逻辑
const time = ref(0)
const showTimeString = computed(() => formatTime(time.value))
const timeInterval = ref()

const startTiming = () => {
  time.value = 1
  clearInterval(timeInterval.value)
  timeInterval.value = setInterval(() => {
    time.value += 1
  }, 1000)
}

// 停止计时函数
const stopTiming = () => {
  clearInterval(timeInterval.value)
}
// 重置计时器方法
const resetTimer = () => {
  stopTiming()
  question.value.timeSpent = time.value
  // startTiming()
}
defineExpose({
  resetTimer,
})

onMounted(() => {
  getQuestion()
  startTiming()
})

onUnmounted(() => {
  clearInterval(timeInterval.value)
})
// 获取第一道题目
const getQuestion = async topicId => {
  if (route.query.sectionId && route.query.pointId) {
    question.value = await getNextQuestion({
      sectionId: route.query.sectionId,
      knowPointId: route.query.pointId,
      answerTime: 0,
      stuAnswer: '',
      topicId: topicId ?? 0,
      studentId: userStore.studentId,
    })
  }else {
    to404()
  }
}

// 下一题
const nextQuestion = async () => {
    count.value += 1
    answer.value = ''
    submitted.value = false

    await getQuestion(question.value.id)
    startTiming()
}

const submit = async () => {
  const data = {
    answerTime: time.value,
    knowPointId: route.query.pointId,
    sectionId: route.query.sectionId,
    studentId: userStore.studentId,
    stuAnswer: answer.value,
    topicId: question.value.id
  }
  result.value = await getAnswer(data)
  submitted.value = true
  stopTiming()
  // 更新当前题目状态
  const currentIndex = questionStatus.value.findIndex(status => !status);
  if (currentIndex !== -1) {
    questionStatus.value[currentIndex] = true;
  }
  if (count.value === 10) {
    ElMessage.success("以完成所有题目");
    submitted.value = false;
  }
}

</script>

<style lang="scss" scoped>
main {
  position: relative;
  width: 1000px;
  height: 600px;
  margin: 0 15px;
  margin-bottom: 128px;

  .questionBox {
    float:left;
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: $padding-xxl;
    padding-top: $padding-xxl;
  }
}
.question-nav {
  position: absolute;
  bottom: 45px;
  right: 45px;
  margin-top: 20px;
  text-align: center;
}
.LL-Talk {
  position: absolute;
  top: 160px;
  right: 10px;
  height: 100px;
  width: 27%;
  margin-bottom: 100px;
}

footer {
  background-color: $base-bg-color;
  padding: $padding-xxl 0;
  height: 128px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .footerBox {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    width: $main-width;
    margin: 0 auto;

    .left {
      display: flex;
      align-items: center;

      .viewDotBox {
        min-width: 200px;
        display: flex;
        gap: $padding-s;
      }

      .tipBox {
        display: flex;
        align-items: center;
        gap: $padding-xl;
        margin-left: 20px;

        & > div {
          display: flex;
          align-items: center;
          gap: $padding-s;
        }
      }
    }
  }
}
.answer {
  width: 100%;
  font-size: 16px;
  margin-top: $padding-xxl;
.judge,.analysis {
  margin: $padding-xxl;
}
}
</style>