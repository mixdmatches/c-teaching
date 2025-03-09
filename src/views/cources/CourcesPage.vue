<template>
  <HeaderCm />
  <MainCm>
    <ul class="section">
      <el-button
        :class="{ active: i === currentISec }"
        round
        v-for="(item, i) in sections"
        :key="item"
        >第{{ item.sectionId }}章</el-button
      >
    </ul>
    <ul class="status">
      <el-button
        :class="{ active: i === currentISta }"
        round
        v-for="(item, i) in status"
        :key="item"
        >{{ item }}</el-button
      >
    </ul>
    <div class="knowledges">
      <div
        class="knowledge-card"
        v-for="(item, index) in knowledges"
        @click="goToDetail(index)"
      >
        <h5 :style="{ color: activeColor[item.status] }">{{ item.name }}</h5>
        <p>
          {{ item.intro }}
        </p>
      </div>
    </div>
    <el-pagination
      :current-page="courcesReq.pageNo"
      :page-size="courcesReq.pageSize"
      :page-sizes="[4, 6, 8, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </MainCm>
</template>

<script setup>
import MainCm from '@/components/MainCm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 请求参数
const courcesReq = ref({
  pageNo: 1,
  pageSize: 6,
  currentISec: 0,
  currentISta: 0,
})

const sections = ref([
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

const status = ref(['全部', '学习过', '待学习', '未解锁'])
const currentISec = ref(0)
const currentISta = ref(0)

const knowledges = ref([
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '0',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '0',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '1',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '2',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '0',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '1',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '2',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '0',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '1',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '2',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '0',
    typeof: '第一章',
  },
  {
    name: '知识点名称',
    intro:
      '知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介知识点简介',
    status: '1',
    typeof: '第一章',
  },
])


const activeColor = ref(['#67c23a', '#409eff', '#f56c6c'])


// 跳转到知识点详情页
const goToDetail = index => {
  router.push({ path: '/knowledgeDetail', query: { index } })
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
