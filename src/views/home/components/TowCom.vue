<template>
  <div class="chart-tow" ref="tow"></div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  pointList: Array,
})
let myChart // 定义 myChart 变量
const tow = ref() // 定义 tow 变量
// 定义 option 变量
const option = ref({
  // 添加标题配置
  title: {
    text: '知识点难度分布', // 标题文本
    left: 'center', // 标题位置
    top: '5%', // 调整标题垂直位置
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    left: 'center',
    top: '85%',
  },
  series: [
    {
      name: '难度分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [], // 初始化为空数组
    },
  ],
})

// 计算出难度分布
const points = computed(() => {
  let map = new Map()
  props.pointList.map(item => {
    map.has(item.difficulty)
      ? map.set(item.difficulty, map.get(item.difficulty) + 1)
      : map.set(item.difficulty, 1)
  })
  let arr = []
  map.forEach((value, key) => {
    switch (key) {
      case 1:
        key = '简单'
        break
      case 2:
        key = '简单偏中等'
        break
      case 3:
        key = '中等'
        break
      case 4:
        key = '中等偏难'
        break
      case 5:
        key = '困难'
        break
    }
    arr.push({
      value,
      name: key,
    })
  })
  return arr
})

// 过滤出需要的点
const filterPoints = () => {
  option.value.series[0].data = points.value
  if (myChart) {
    myChart.setOption(option.value)
  }
}

// 初始化图表
onMounted(() => {
  myChart = echarts.init(tow.value)
  filterPoints() // 初始化时调用 filterPoints 函数
})

// 当 points 变化时更新图表
watch(points, () => {
  filterPoints()
})
</script>

<style lang="scss" scoped>
.chart-tow {
  // 占去剩下的空间
  flex: 1;
  height: 300px;
}
</style>
