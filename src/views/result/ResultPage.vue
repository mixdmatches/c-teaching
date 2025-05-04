<script setup>
import SubHeader from '@/components/SubHeader.vue'
import LButton from '@/components/LButton.vue'
import { onMounted, ref } from 'vue'
import QuestionResultItem from '@/views/result/components/QuestionResultItem.vue'
import ProblemViewDot from '@/components/problemViewDot.vue'
import { useRoute, useRouter } from 'vue-router'
import { getAnswer, getNextKnowledge } from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'
import LLMTalk from '@/views/knowledge/components/LLMTalk/index.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
// 结果
const result = ref()

const handleGetAnswer = async () => {
  const data = await getAnswer({
    ...route.query,
    studentId: userStore.studentId,
    knowPointId: route.query.pointId ?? 1,
  })
  data.showTopicResponses = data.showTopicResponses?.map((item, index) => {
    return {
      ...item,
      no: index + 1,
      type: 'radio',
    }
  })
  result.value = data
}

onMounted(() => handleGetAnswer())
// 重新测试回调函数
const handleResetTest = () => {
  // 传递路由参数并跳转
  router.push({
    path: '/question',
    query: {
      pointId: route.query.pointId,
      sectionId: route.query.sectionId,
    },
  })
}

// 学习下一个知识点
const nextknowPointId = ref()
const nextSectionId = ref()
const getNextKnowledgePoint = async () => {
  const data = {
    knowPointId: route.query.pointId,
    sectionId: route.query.sectionId,
  }
  const response = await getNextKnowledge(data)
  nextknowPointId.value = response?.knowPointId
  nextSectionId.value = response?.sectionId
  router.push({
    path: '/knowledgeDetail',
    query: {
      pointId: nextknowPointId.value,
      sectionId: nextSectionId.value,
      studentId: userStore.studentId,
    },
  })
}
</script>

<template>
  <SubHeader title="测试结果" :can-back="false">
    <template #right>
      <div class="headerRight">
        <div>对AI评估结果不满意?</div>
        <LButton @click="handleResetTest">重新测试</LButton>
      </div>
    </template>
  </SubHeader>

  <main>
    <el-scrollbar class="scroll-box">
      <div class="topBox">
        <div class="box">
          <div>{{ (result?.correctRate * 100).toFixed(0) }}%</div>
          <div>正确率</div>
        </div>
        <div class="box">
          <div>
            {{ result?.correctCount }}/{{ result?.showTopicResponses?.length }}
          </div>
          <div>答对题数</div>
        </div>
        <div class="box">
          <div>{{ route.query.time }}s</div>
          <div>用时</div>
        </div>
        <div class="box">
          <div>{{ (result?.maturity * 100 ?? 0).toFixed(1) }}%</div>
          <div>熟练程度</div>
        </div>
      </div>
      <div class="questionBox">
        <QuestionResultItem
          v-for="(item, index) in result?.showTopicResponses"
          :key="index"
          :option="item"
        />
      </div>
    </el-scrollbar>
    <LLMTalk />
  </main>

  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot
            v-for="item in result?.showTopicResponses"
            :key="item"
            :error="
              Boolean(item.studentAnswer) && item.studentAnswer !== item.answer
            "
            :value="item.studentAnswer"
            complete-color="#00ff0c"
          >
            {{ item.no }}
          </ProblemViewDot>
        </div>
        <div class="tipBox">
          <div>
            <ProblemViewDot value="1" error></ProblemViewDot>
            <span>错误</span>
          </div>
          <div>
            <ProblemViewDot complete-color="#00ff0c" value="1"></ProblemViewDot>
            <span>正确</span>
          </div>
          <div>
            <ProblemViewDot></ProblemViewDot>
            <span>未完成</span>
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 20px">
        <LButton border @click="() => router.push('/')">返回首页</LButton>
        <LButton
          v-if="result?.maturity >= 0.8"
          border
          @click="getNextKnowledgePoint"
          >学习下一章</LButton
        >
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.headerRight {
  display: flex;
  align-items: center;
  gap: $padding-xl;
}
.topBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2 * $padding-xxl;
  padding: 0 $padding-l;
  .box {
    flex: 1;
    font-size: 2 * $font-size-xxl;
    display: flex;
    flex-direction: column;
    gap: $padding-xl;
    background-color: $base-bg-color;
    padding: $padding-xl $padding-m;
    border-radius: 10px;
  }
}
main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: $padding-xl;
  height: calc(100vh - 228px);
  padding: $margin-l;
  .scroll-box {
    flex: 2;
    height: calc(100vh - 228px);
    overflow-y: auto;
    .questionBox {
      display: flex;
      flex-direction: column;
      gap: $padding-xxl;
      padding-top: $padding-xxl;
    }
  }
}

footer {
  background-color: $base-bg-color;
  padding: $padding-xl 0;
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

@media screen and (max-width: 768px) {
  .headerRight {
    flex-direction: column;
    gap: $padding-s;
  }

  .topBox {
    flex-direction: column;
    gap: $padding-m;
    padding: 0 $padding-s;

    .box {
      width: 100%;
      font-size: $font-size-xl;
      padding: $padding-m;
    }
  }

  main {
    gap: 0;
  }

  footer {
    height: auto;
    padding: $padding-m;

    .footerBox {
      flex-direction: column;
      gap: $padding-m;
      width: 100%;

      .left {
        flex-direction: column;
        align-items: flex-start;
        gap: $padding-m;

        .viewDotBox {
          min-width: auto;
        }
      }
    }
  }
}
</style>
