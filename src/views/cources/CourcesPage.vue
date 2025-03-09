<template>
  <HeaderCm />
  <MainCm>
    <ul class="section">
      <el-button
        :class="{ active: i === courcesReq.currentISec }"
        round
        v-for="(item, i) in sections"
        :key="item.sectionId"
        @click="handleSectionClick(i)"
        >{{
          item.sectionId == 0
            ? '全部'
            : `第${numberToChinese(item.sectionId)}章`
        }}</el-button
      >
    </ul>
    <ul class="status">
      <el-button
        :class="{ active: i === courcesReq.currentISta }"
        round
        v-for="(item, i) in status"
        :key="item.knowState"
        @click="handleStatusClick(i)"
        >{{ item.stateName }}</el-button
      >
    </ul>
    <div class="knowledges">
      <div
        class="knowledge-card"
        v-for="item in knowledges"
        :key="item.id"
        @click="goToDetail(item.pointId, item.sectionId, item.knowState)"
      >
        <h5 :style="{ color: activeColor[item.knowState] }">
          {{ item.pointName }}
        </h5>
        <p>
          {{ item.context }}
        </p>
      </div>
    </div>
    <el-pagination
      :current-page="courcesReq.pageNo"
      :page-size="courcesReq.pageSize"
      :page-sizes="[6, 12, 18]"
      :background="background"
      layout="total,sizes, prev, pager, next, jumper"
      :total="knowledges.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </MainCm>
</template>

<script setup>
import MainCm from '@/components/MainCm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入 debounce 函数
import { debounce } from 'lodash'
// 导入api
import { apiGetAllPoints } from '@/api/chapters'
import { ElMessage } from 'element-plus'
const activeColor = ref(['#67c23a', '#f56c6c'])
const router = useRouter()

// 请求参数
const courcesReq = ref({
  pageNo: 1,
  pageSize: 6,
  currentISec: 0,
  currentISta: 0,
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
    knowState: 1,
    stateName: '未解锁',
  },
])

const handleCurrentChange = value => {
  console.log(value)
}

// 知识点列表
const knowledges = ref([])

// 获取所有知识点列表
const getAllPoints = async () => {
  const res = await apiGetAllPoints()
  knowledges.value = res.data.points
}
getAllPoints()

// 选择章节按钮回调
const handleSectionClick = i => {
  courcesReq.value.currentISec = i
}

// 选择状态按钮回调
const handleStatusClick = i => {
  courcesReq.value.currentISta = i
}

// 定义防抖函数
const debouncedWarning = debounce(() => {
  ElMessage.warning('请先学习前置知识点')
}, 500)
// 跳转到知识点详情页
const goToDetail = (pointId, sectionId, knowState) => {
  if (knowState === 2) {
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
</script>

<style lang="scss" scoped>
.active {
  background-color: $primary-color;
  color: #fff;
}
.section {
  margin: $margin-xl 0;
  display: flex;
}
.knowledges {
  width: 100%;
  margin: $margin-xl 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: $margin-xl;
  .knowledge-card {
    // width: calc(25% - #{$margin-xl * 3 / 4});
    width: calc((100% - #{$margin-xl * 2}) / 3);
    border: 1px solid #ccc;
    height: 120px;
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
    h5 {
      margin-bottom: $margin-m;
      font-size: $font-size-xl;
      font-weight: bold;
    }
    p {
      margin: 0;
      font-size: $font-size-l;
      color: #666;
      line-height: 1.5;
      // 多行文本溢出显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
