<template>
  <HeaderCm />
  <MainCm>
    <ul class="section">
      <el-button
        :class="{ active: i === currentISec }"
        round
        v-for="(item, i) in sections"
        :key="item"
        >{{ item }}</el-button
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
      :current-page="currentPage4"
      :page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :background="background"
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
const sections = ref([
  '全部',
  '第一章',
  '第二章',
  '第三章',
  '第四章',
  '第五章',
  '第六章',
  '第七章',
  '第八章',
  '第九章',
  '第十章',
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
