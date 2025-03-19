<script setup>
import SubHeader from "@/components/SubHeader.vue";
import LButton from "@/components/LButton.vue";
import { onMounted, ref } from 'vue'
import QuestionResultItem from "@/views/result/components/QuestionResultItem.vue";
import ProblemViewDot from "@/components/problemViewDot.vue";
import { useRoute, useRouter } from 'vue-router'
import { getAnswer } from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'
import { formatToMinute } from '@/utils/dateUtils.js'

const router = useRouter();
const route = useRoute()
const userStore = useUserStore()
const result = ref()
const handleGetAnswer = async () => {
  if (route.query.pointId ){
    const data  = await getAnswer({
      knowId: route.query.pointId,
      sectionId: route.query.sectionId,
      topicResults: JSON.parse(route.query.results),
      studentId: userStore.studentId 
    })
    data.showTopicResponses = data.showTopicResponses.map((item,index) => {
      return{
        ...item,
        no:index+1,
        type: 'radio',
      }
    })
    result.value = data
  } else if(route.query.sectionId) {
     const data  = await getAnswer({
      knowId: route.query.sectionId,
      sectionId: route.query.sectionId,
      topicResults: JSON.parse(route.query.results),
      studentId: userStore.studentId 
    })
    data.showTopicResponses = data.showTopicResponses.map((item,index) => {
      return{
        ...item,
        no:index+1,
        type: 'radio',
      }
    })
    result.value = data

  }
}

onMounted(() => {
  handleGetAnswer()
})
//调用接口模拟数据
</script>

<template>
  <SubHeader title="测试结果" :can-back="false">
    <template #right>
      <div class="headerRight">
        <div>对AI评估结果不满意?</div>
        <LButton>重新测试</LButton>
      </div>
    </template>
  </SubHeader>

  <main>
    <el-scrollbar>
      <div class="topBox">
        <div class="box">
          <div>{{result?.correctRate*100}}%</div>
          <div>正确率</div>
        </div>
        <div class="box">
          <div>{{result?.correctCount}}/{{result?.showTopicResponses?.length}}</div>
          <div>答对题数</div>
        </div>
        <div class="box">
          <div>{{formatToMinute(route.query.time)}}min</div>
          <div>用时</div>
        </div>
        <div class="box">
          <div>{{result?.accuracy ?? 0}}%</div>
          <div>熟练程度</div>
        </div>
      </div>
      <div class="questionBox">
        <QuestionResultItem v-for="(item,index) in result?.showTopicResponses" :key="index" :option="item" />
      </div>
    </el-scrollbar>
  </main>
  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot v-for="(item,index) in result?.showTopicResponses" :error="Boolean(item.studentAnswer) && item.studentAnswer !== item.answer" :value="item.studentAnswer" complete-color="#00ff0c">
            {{item.no}}
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
      <div style="display: flex;gap: 20px">
        <LButton @click="() => router.push('/')" border>返回首页</LButton>
        <LButton v-if="result?.accuracy !== 100">提交</LButton>
        <LButton v-else @click="() => router.push('/question')" border>测试下一章</LButton>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.headerRight{
  display: flex;
  align-items: center;
  gap: $padding-xl;
}
.topBox{
  display: flex;
  justify-content: space-between;
  gap: 2 * $padding-xxl;
  padding: 0 $padding-l;
  .box{
    flex: 1;
    font-size:2 * $font-size-xxl;
    display: flex;
    flex-direction: column;
    gap: $padding-xl;
    background-color: $base-bg-color;
    padding: $padding-xl $padding-m;
    border-radius: 10px;
  }
}
main{
  width: $main-width;
  margin: 0 auto;
  padding: $padding-xl 0;
  height: calc(100vh - 228px);
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