<template>
  <HeaderCm />
  <MainCm v-if="userStore.isCeshi">
    <div class="top">
      <h2>上次学到</h2>
      <span class="study">
        <p>{{ studentStatus.pointName }}</p>
        <el-button type="primary">继续学习</el-button>
      </span>
      <p class="next-study">下一个知识点：{{ studentStatus.nextPointName }}</p>
    </div>
    <div class="four-data">
      <div class="item">
        <span class="title">学习时长</span>
        <span class="num">45min</span>
      </div>
      <div class="item">
        <span class="title">进度</span>
        <span class="num">{{ plan }}%</span>
      </div>
      <div class="item">
        <span class="title">知识点</span>
        <span class="num">{{ studyPoints.length }}/{{ points.length }}</span>
      </div>
    </div>
    <div class="data">
      <!-- 折线图 -->
      <OneCom />
      <!-- 圆环 进度-->
      <TowCom />
    </div>
  </MainCm>
  <MainCm v-else>
    <div class="top-todo">
      <h2>请先测试，测试后可选择课程学习</h2>
      <span>
        <!-- <el-select
          v-model="chapterId"
          placeholder="请选择章节"
          style="width: 250px; margin-right: 5px"
        >
          <el-option
            v-for="chapter in chapters"
            :key="chapter.sectionId"
            :label="chapter.sectionName"
            :value="chapter.sectionId"
          />
        </el-select> -->
        <el-button type="primary" @click="handleTest">进入测试</el-button>
      </span>
      <el-button @click="userStore.changeCeshi">假如测试完后返回页面</el-button>
    </div>
    <div class="data-todo">
      <el-empty description="测试后再查看数据" />
    </div>
  </MainCm>
</template>

<script setup>
import MainCm from '../../components/MainCm.vue'
import OneCom from './components/OneCom.vue'
import TowCom from './components/TowCom.vue'
import { ElMessage } from 'element-plus'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
// api
import { apiGetStudyStatus } from '@/api/home.js'
import {
  apiGetAllChapters,
  apiGetAllPoints,
  apiGetStudyPoints,
} from '@/api/chapters.js'
const router = useRouter()
const userStore = useUserStore()

// 进入测试按钮
const handleTest = () => {
  router.push({
    path: '/question',
  })
}

const studentStatus = ref({})
// 1.获取学生学习情况
const getStudyStatus = async () => {
  const res = await apiGetStudyStatus()
  studentStatus.value = res
}
getStudyStatus()

// const chapters = ref([])
// const chapterId = ref('')
// // 2.获取章节列表
// const getChapters = async () => {
//   const res = await apiGetAllChapters()
//   chapters.value = res.chapters
// }
// getChapters()

// 3.获取所有知识点列表
const points = ref([])
const getAllPoints = async () => {
  const res = await apiGetAllPoints()
  points.value = res.points
}
getAllPoints()

// 4.获取已学知识点列表
const studyPoints = ref([])
const getStudyPoints = async () => {
  const res = await apiGetStudyPoints()
  studyPoints.value = res.points
}
getStudyPoints()

const plan = computed(() =>
  Math.ceil((studyPoints.value.length / points.value.length) * 100)
)
</script>

<style lang="scss" scoped>
@mixin top-flex {
  width: 100%;
  height: 200px;
  background-color: $base-bg-color;
  padding: $padding-xxl;
  border-radius: $border-radius-m;
  display: flex;
  gap: $margin-xxl;
  h2 {
    color: $primary-color;
    font-size: 3.6rem;
  }
}
@mixin data-flex {
  width: 100%;
  height: auto;
  margin-top: $margin-xxl;
  background-color: $base-bg-color;
  border-radius: $border-radius-m;
  display: flex;
  gap: $margin-xxl;
}
.top-todo {
  @include top-flex;
  flex-direction: column;
  justify-content: center;
}
.top {
  @include top-flex;
  justify-content: center;
  flex-direction: column;
  .study {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 2.4rem;
    }
  }
  .next-study {
    font-size: 1.4rem;
    color: $info-color;
  }
}
.data {
  @include data-flex;
}
.data-todo {
  @include data-flex;
  justify-content: center;
  align-items: center;
}
.four-data {
  width: 100%;
  height: 200px;
  margin-top: $margin-xl;
  background-color: $base-bg-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $padding-xxl;
  border-radius: $border-radius-m;
  .el-row {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-col {
    text-align: center;
    font-size: 1.6rem;
    color: $text-color;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: $primary-color;
    }
  }
  .item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $margin-m;
    .title {
      font-size: 1.6rem;
      color: $text-color;
    }
    .num {
      font-size: 3.6rem;
      color: $primary-color;
      font-family: DingTalk;
    }
  }
}
.dialog-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: $margin-xxl;
  .dialog-text {
    font-size: 1.4rem;
    color: $text-color;
    line-height: 1.5;
  }
}
</style>
