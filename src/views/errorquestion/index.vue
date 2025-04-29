<template>
  <HeaderCm />
  <div class="content-box">
    <AiAnalyze />
    <el-card shadow="never" style="margin-top: 20px">
      <template #header>
        <div class="head">
          <span>错题本</span>
          <span>共{{ errCount }}题</span>
        </div>
      </template>
      <el-select
        style="width: 200px"
        @change="handleChangeChapter"
        v-model="selectOption"
      >
        <el-option
          v-for="item in chapter"
          :label="item.text"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
      <el-table
        v-loading="isLoading"
        stripe
        :data="errorQuestionList"
        style="width: 100%"
        height="550"
      >
        <el-table-column prop="title" label="题目" />
        <el-table-column prop="knowPointName" label="知识点" width="180">
          <template #default="scope">
            <el-tag>{{ scope.row.knowPointName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度">
          <template #default="scope">
            <el-rate disabled v-model="scope.row.difficulty" />
          </template>
        </el-table-column>
        <el-table-column prop="hierarchy" label="重点">
          <template #default="scope">
            <el-rate disabled v-model="scope.row.hierarchy" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleVisibelity(row)"
            >
              查看详情
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleWordSameQs(row)"
              >做同类型</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <ErrorQsDetail
        :visible="dialogTableVisible"
        :currentRow="currentRow"
        @update:visible="dialogTableVisible = $event"
      />
    </el-card>
  </div>
</template>

<script setup>
// 引入api
import { getErrorQuestion } from '@/api/question'
// 引入组件
import ErrorQsDetail from './components/ErrorQsDetail.vue'
import AiAnalyze from './components/AiAnalyze.vue'
import HeaderCm from '@/components/HeaderCm.vue'
// 引入仓库
import { useUserStore } from '@/stores/index'
// 引入hook
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
// 章节选择变量
const selectOption = ref(0)
//控制弹窗显隐变量
const dialogTableVisible = ref(false)
//当前查看的行数据
const currentRow = ref({})
// 章节列表变量
const chapter = [
  { id: 0, text: '全部' },
  { id: 1, text: '第一章' },
  { id: 2, text: '第二章' },
  { id: 3, text: '第三章' },
  { id: 4, text: '第四章' },
  { id: 5, text: '第五章' },
  { id: 6, text: '第六章' },
  { id: 7, text: '第七章' },
  { id: 8, text: '第八章' },
  { id: 9, text: '第九章' },
  { id: 10, text: '第十章' },
]
// 错题列表变量
const errorQuestionList = ref([])
// 所有错题数量
const errCount = ref(0)
// 控制是否加载
const isLoading = ref(false)
// 获取错题列表函数
const getErrorQuestionList = async () => {
  isLoading.value = true
  if (selectOption.value == 0) {
    const {
      data: { showTopicResults },
    } = await getErrorQuestion({
      stuId: userStore.studentId,
    })
    errCount.value = showTopicResults.length
    errorQuestionList.value = showTopicResults
  } else {
    const {
      data: { showTopicResults },
    } = await getErrorQuestion({
      stuId: userStore.studentId,
      sectionId: selectOption.value,
    })
    errorQuestionList.value = showTopicResults
  }
  isLoading.value = false
}
// 选择章节变化函数
const handleChangeChapter = () => {
  getErrorQuestionList()
}
// 查看详情函数
const handleVisibelity = row => {
  dialogTableVisible.value = true
  currentRow.value = row
}
// 做同类型函数
const handleWordSameQs = row => {
  router.push({
    path: '/exercise',
    query: {
      topicId: row.id,
    },
  })
}
// 生命周期函数 挂载后获取错题列表
onMounted(() => {
  getErrorQuestionList()
})
</script>

<style lang="scss" scoped>
.content-box {
  padding: 0 $padding-xl;
}
.head {
  display: flex;
  gap: $margin-s;
  span {
    font-size: 2rem;
    font-weight: bold;
    color: #000;
  }
}
</style>
