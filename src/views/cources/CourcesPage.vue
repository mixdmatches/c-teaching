<template>
  <HeaderCm />
  <div class="main">
    <div class="select-box">
      <ul class="section">
        <el-button
          v-for="(item, i) in sections"
          :key="item.sectionId"
          :class="{ active: i === currentSection }"
          round
          @click="handleSectionClick(i, item.sectionId)"
          >{{
            item.sectionId == 0
              ? '全部'
              : `第${numberToChinese(item.sectionId)}章`
          }}</el-button
        >
      </ul>
      <ul v-if="courcesReq.sectionId == 0" class="status">
        <el-button
          v-for="(item, i) in status"
          :key="item.knowState"
          :class="{ active: i === currentStatus }"
          round
          @click="handleStatusClick(i, item.knowState)"
          >{{ item.stateName }}</el-button
        >
      </ul>
    </div>
    <div v-if="filterKnowledges.length !== 0" class="knowledges">
      <div
        v-for="item in filterKnowledges"
        :key="item.id"
        class="knowledge-card"
        @click="goToDetail(item.knowId, item.sectionId, item.knowState)"
      >
        <span class="card-header">
          <h5 :style="{ color: activeColor[item.knowState] }">
            {{ item.knowId }}.{{ item.knowName }}
          </h5>
          <el-rate
            v-model="item.hierarchy"
            :colors="['#409eff', '#409eff', '#409eff']"
            disabled
            show-score
            text-color="#409eff"
            score-template="重点"
            size="small"
          />
          <el-rate
            v-model="item.difficulty"
            disabled
            :colors="['#409eff', '#409eff', '#409eff']"
            show-score
            text-color="#409eff"
            score-template="难度"
            size="small"
          />
          <span class="expertly">熟练度：{{ item.expertly }}</span>
        </span>
        <p :style="{ backgroundColor: activeInfoColor[item.knowState] }">
          {{ item.describe }}
        </p>
      </div>
    </div>
    <el-empty v-else style="width: 100%" :image="empty" />
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入 debounce 函数
import { debounce } from 'lodash'
import empty from '@/assets/images/empty_1.png'
// 导入api
import { apiGetAllPoints } from '@/api/chapters'
import { ElMessage } from 'element-plus'
const activeColor = ref(['#67c23a', '#67c23a', '#f56c6c'])
const activeInfoColor = ref([
  'rgb(239.8, 248.9, 235.3)',
  'rgb(239.8, 248.9, 235.3)',
  'rgb(254, 240.3, 240.3)',
])
const router = useRouter()

const currentSection = ref(0)
const currentStatus = ref(0)

// 过滤参数
const courcesReq = ref({
  sectionId: 0,
  knowState: -1,
})

// 章节列表
const sections = ref([
  {
    sectionId: 0,
    sectionName: '全部',
  },
  {
    sectionId: 1,
    sectionName: 'C语言概述',
  },
  {
    sectionId: 2,
    sectionName: 'C语言基本语法',
  },
  {
    sectionId: 3,
    sectionName: 'C语言数据类型',
  },
  {
    sectionId: 4,
    sectionName: 'C语言运算符',
  },
  {
    sectionId: 5,
    sectionName: 'C语言流程控制',
  },
  {
    sectionId: 6,
    sectionName: 'C语言函数',
  },
  {
    sectionId: 7,
    sectionName: 'C语言数组',
  },
  {
    sectionId: 8,
    sectionName: 'C语言指针',
  },
  {
    sectionId: 9,
    sectionName: 'C语言结构体',
  },
  {
    sectionId: 10,
    sectionName: 'C语言文件操作',
  },
])

// 状态列表
const status = ref([
  {
    knowState: -1,
    stateName: '全部',
  },
  {
    knowState: 0,
    stateName: '已学习',
  },
  {
    knowState: 2,
    stateName: '未解锁',
  },
])

// 知识点列表
const knowledges = ref([])
const filterKnowledges = ref([])
// 获取所有知识点列表
const getAllPoints = async () => {
  const res = await apiGetAllPoints(210047301)
  knowledges.value = res.data.knowPointList
  filterKnowledges.value = res.data.knowPointList
}
getAllPoints()

// 选择章节按钮回调
const handleSectionClick = (i, sectionId) => {
  currentSection.value = i
  courcesReq.value.sectionId = sectionId
  filterKnowledges.value = filter(sectionId, courcesReq.value.knowState)
}

// 选择状态按钮回调
const handleStatusClick = (i, knowState) => {
  currentStatus.value = i
  courcesReq.value.knowState = knowState
  filterKnowledges.value = filter(courcesReq.value.sectionId, knowState)
}

// 定义防抖函数
const debouncedWarning = debounce(() => {
  ElMessage.warning('请先学习前置知识点')
}, 500)
// 跳转到知识点详情页
const goToDetail = (pointId, sectionId, knowState) => {
  if (knowState == 2) {
    // 调用防抖函数
    debouncedWarning()
  } else {
    router
      .push({
        path: '/knowledgeDetail',
        query: { pointId, sectionId },
      })
      .catch(error => {
        // 处理路由跳转失败的情况
        ElMessage.error(`路由跳转失败: ${error.message}`)
      })
  }
}

// 定义转换函数
const numberToChinese = num => {
  const chineseNumbers = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
  ]
  const unit = ['', '十', '百', '千', '万']
  let numStr = num.toString()
  let result = ''
  const len = numStr.length

  if (len === 1) {
    result = chineseNumbers[num]
  } else {
    for (let i = 0; i < len; i++) {
      const digit = parseInt(numStr[i])
      if (digit !== 0) {
        result += chineseNumbers[digit] + unit[len - i - 1]
      } else {
        // 如果当前位是 0，且下一位不是 0，则添加零
        if (i < len - 1 && parseInt(numStr[i + 1]) !== 0) {
          result += '零'
        }
      }
    }
    // 处理 11 - 19 的特殊情况，简化为 十一 - 十九
    if (len === 2 && numStr[0] === '1') {
      result = result.slice(1)
    }
    // 去除末尾的零
    result = result.replace(/零+$/, '')
  }

  return result
}

// 过滤函数
const filter = (sectionId, knowState) => {
  // ok
  if (sectionId == 0 && knowState == -1) {
    return knowledges.value
  }
  //ok
  if (sectionId == 0 && knowState !== -1) {
    return knowledges.value.filter(item => item.knowState == knowState)
  }
  // ok
  if (sectionId !== 0 && knowState == -1) {
    return knowledges.value.filter(item => item.sectionId == sectionId)
  }
  if (sectionId !== 0 && knowState !== -1) {
    return knowledges.value.filter(item => item.sectionId === sectionId)
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0 3 * $padding-xxl;
  display: flex;
  flex-direction: column;
  align-items: self-start;
}
.select-box {
  .active {
    background-color: $primary-color;
    color: #fff;
  }
  .section {
    margin: $margin-xl 0;
    display: flex;
  }
}

.knowledges {
  width: 100%;
  margin: $margin-xl 0;
  display: flex;
  flex-wrap: wrap;
  gap: $margin-l;
  .knowledge-card {
    width: calc((100% - #{$margin-l}) / 2);
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: $border-radius-s;
    padding: $padding-xl;
    cursor: pointer;
    transition: all 0.3s ease;
    /* 鼠标悬停时的样式 */
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 添加阴影效果，增强视觉反馈
      transform: translateY(-5px); // 卡片向上移动 5px，产生上浮效果
    }
    .card-header {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: $margin-xxl;
      margin-bottom: $margin-m;
      h5 {
        font-size: $font-size-xl;
        font-weight: bold;
      }
      .expertly {
        font-size: $font-size-l;
        color: $primary-color;
      }
    }

    p {
      margin: 0;
      font-size: $font-size-l;
      color: #666;
      background-color: $light-blue;
      line-height: 2.5;
      // 多行文本溢出显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

// 移动端样式调整
@media screen and (max-width: 768px) {
  .main {
    padding: 0 $padding-xl;
  }
  .select-box {
    flex-direction: column;
  }
  .select-box .section {
    flex-wrap: wrap;
    gap: $margin-m;
    justify-content: stretch;
  }
  .knowledges .knowledge-card {
    width: 100%;
    .card-header {
      flex-direction: column;
      gap: $margin-s;
    }
  }
}
</style>
