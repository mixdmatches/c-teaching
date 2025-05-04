<script setup>
import SubHeader from '@/components/SubHeader.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import QuestionItem from '@/views/question/components/QuestionItem.vue'
import { formatTime } from '@/utils/dateUtils.js'
import { useRoute } from 'vue-router'
import { handleGetAndSubmitQuestion } from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'
import HeaderCm from '@/components/HeaderCm.vue'
import { to404 } from '@/router/index.js'
import LLMTalk from '@/views/knowledge/components/LLMTalk'
import ProblemViewDot from '@/components/problemViewDot.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const questionInfo = ref()
// 做题总时间
const totalTime = ref(0)

// 题目
const question = computed(() => {
  if (
    questionInfo.value?.showTopicResultList &&
    questionInfo.value?.showTopicResultList.length > 0
  ) {
    return {
      topicType: questionInfo.value.topicType,
      ...questionInfo.value.showTopicResultList[
        questionInfo.value.showTopicResultList.length - 1
      ],
    }
  }
  return {}
})
// 相同类型的题目
const _similarQuestion = ref()
const _handleSimilarQuestion = async () => {}
// if (route.query.topicId) {

// }
// 答案
const answer = ref()
// 是否已提交
const submitted = ref(false)
// 题目的回答状态
const _questionStatus = ref(Array(10).fill(false))
// 是否存在下一题
const hasNext = ref(true)
// 时间相关逻辑
const _time = ref(0)
const showTimeString = computed(() => formatTime(totalTime.value))
const timeInterval = ref()

// const restartTiming = () => {
//   totalTime.value = 1
//   clearInterval(timeInterval.value)
//   timeInterval.value = setInterval(() => {
//     totalTime.value += 1
//   }, 1000)
// }
// 启动计时器
const startTiming = () => {
  if (!timeInterval.value) {
    timeInterval.value = setInterval(() => {
      totalTime.value += 1
    }, 1000)
  }
}
// 停止计时函数
const _stopTiming = () => {
  clearInterval(timeInterval.value)
}
// 重置计时器方法
// const resetTimer = () => {
//   stopTiming()
//   restartTiming()
// }
// defineExpose({
//   resetTimer,
// })

onMounted(() => {
  getQuestion()
  totalTime.value = 1
  startTiming()
})

onUnmounted(() => {
  clearInterval(timeInterval.value)
})
// 获取题目
const getQuestion = async () => {
  if (route.query.sectionId && route.query.pointId) {
    questionInfo.value = await handleGetAndSubmitQuestion({
      sectionId: route.query.sectionId,
      knowPointId: route.query.pointId,
      pointId: route.query.pointId,
      answerTime: route.query.answerTime,
      stuAnswer: route.query.stuAnswer,
      // stuAnswer: route.query.topicType == 0? route.query.stuAnswer:'',
      // fillAnswer: route.query.topicType == 1?route.query.stuAnswer:'',
      topicId: route.query.topicId ?? 0,
      studentId: userStore.studentId,
    })
    hasNext.value = questionInfo.value.hasNext
    answer.value = ''
    //resetTimer()
  } else if (route.query.sectionId) {
    questionInfo.value = await handleGetAndSubmitQuestion({
      sectionId: route.query.sectionId,
      pointId: 0,
      knowPointId: route.query.pointId,
      answerTime: totalTime.value,
      stuAnswer: route.query.stuAnswer,
      topicId: route.query.topicId ?? 0,
      studentId: userStore.studentId,
    })
    hasNext.value = questionInfo.value.hasNext
    answer.value = ''
    //resetTimer()
  } else {
    to404()
  }
}
watch(() => route.query.topicId, getQuestion)

// 下一题
const nextQuestion = () => {
  router.push({
    path: '/question',
    query: {
      ...route.query,
      topicId: question.value.id,
      topicType: questionInfo.value.topicType,
      stuAnswer: answer.value,
      answerTime: totalTime.value,
    },
  })
}

const submit = async () => {
  // 提交最后一题答案
  // await handleGetAndSubmitQuestion({
  //   ...route.query,
  //   stuAnswer: answer.value,
  //   answerTime: time.value,
  //   topicId: question.value.id,
  //   studentId: userStore.studentId,
  // })
  router.replace({
    path: '/result',
    query: {
      ...route.query,
      stuAnswer: answer.value,
      topicType: questionInfo.value.topicType,
      knowPointId: route.query.pointId,
      time: totalTime.value,
    },
  })
}
// 底部题号设置
// 固定题号数组
const fixedQuestionNumbers = Array.from({ length: 10 }, (_, i) => i + 1)

// 动态计算每个题号的状态
// 由于 questionStatusList 未被使用，根据规则将变量名改为以 _ 开头
const _questionStatusList = computed(() => {
  const statusList = []
  for (let i = 0; i < fixedQuestionNumbers.length; i++) {
    if (i < questionInfo.value?.showTopicResultList?.length) {
      // 已加载的题目
      statusList.push({
        number: i + 1,
        isCurrent: i === questionInfo.value.showTopicResultList.length - 1,
        isCompleted: true,
      })
    } else {
      // 尚未加载的题目
      statusList.push({
        number: i + 1,
        isCurrent: false,
        isCompleted: false,
      })
    }
  }
  return statusList
})
</script>
<template>
  <HeaderCm />
  <SubHeader title="测试中" exit-text="退出答题">
    <template #right>
      {{ showTimeString }}
    </template>
  </SubHeader>
  <main>
    <div class="questionBox">
      <QuestionItem v-model="answer" :option="question" :disabled="submitted">
        <!--        <div class="answer" v-if="submitted">-->
        <!--          <div class="judge">正确答案:{{result?.showTopicResponses[0]?.answer}};你的答案:{{result?.showTopicResponses[0]?.studentAnswer}}</div>-->
        <!--          <div class="analysis">AI:解析:{{result?.showTopicResponses[0]?.analysis}}</div>-->
        <!--        </div>-->
        <div style="display: flex; justify-content: right">
          <el-button v-show="!hasNext" @click="submit">提交</el-button>
          <el-button v-show="hasNext" :disabled="!answer" @click="nextQuestion"
            >下一题</el-button
          >
        </div>
      </QuestionItem>
    </div>
    <LLMTalk />
  </main>

  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot
            v-for="(status, index) in questionInfo?.showTopicResultList"
            :key="index"
            :value="index !== questionInfo.showTopicResultList.length - 1"
            :index="index"
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

<style lang="scss" scoped>
main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 228px);
  padding: $margin-l;
  .questionBox {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: $padding-xxl;
  }
}
.question-nav {
  position: absolute;
  bottom: 45px;
  right: 45px;
  margin-top: 20px;
  text-align: center;
}

footer {
  background-color: $base-bg-color;
  padding: $padding-xxl 0;
  height: 100px;
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
  .judge,
  .analysis {
    margin: $padding-xxl;
  }
}

@media screen and (max-width: 768px) {
  main {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 16px;

    .questionBox {
      width: 100%;
      height: auto;
      float: none;
    }
  }

  .LL-Talk {
    position: static;
    width: 100%;
    height: 300px;
    margin: 16px 0;
  }

  footer {
    position: static;
    height: auto;
    padding: 16px;

    .footerBox {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;

      .left {
        flex-direction: column;
        align-items: flex-start;

        .viewDotBox {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
