<template>
  <!-- 折线图 -->
  <div ref="one" class="chart-one"></div>
</template>

<script setup>
// 每一章知识点数量的分布
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
defineProps({
  pointList: Array,
})
const one = ref()

let myChart
onMounted(() => {
  myChart = echarts.init(one.value)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  const option = {
    title: {
      text: '每周学习时长（分钟）',
      left: 'center',
      // 移动端标题字体变小
      textStyle: {
        fontSize: window.innerWidth < 768 ? 14 : 18,
      },
    },
    tooltip: {
      trigger: 'axis',
      // 修改工具提示格式，添加分钟单位
      formatter: function (params) {
        return params[0].name + ': ' + params[0].value + ' 分钟'
      },
    },
    legend: {
      left: 'center',
      top: '85%',
      // 移动端图例字体变小
      textStyle: {
        fontSize: window.innerWidth < 768 ? 10 : 12,
      },
    },
    grid: {
      left: window.innerWidth < 768 ? '5%' : '3%',
      right: window.innerWidth < 768 ? '5%' : '4%',
      bottom: window.innerWidth < 768 ? '5%' : '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 移动端 x 轴字体变小
      axisLabel: {
        fontSize: window.innerWidth < 768 ? 10 : 12,
      },
    },
    yAxis: {
      type: 'value',
      // 移动端 y 轴字体变小
      axisLabel: {
        fontSize: window.innerWidth < 768 ? 10 : 12,
      },
    },
    series: [
      {
        data: [140, 100, 135, 80, 70, 110, 130],
        type: 'line',
      },
    ],
  }
  myChart.setOption(option)
})

onUnmounted(() => {
  window.removeEventListener('resize', function () {}) // 移除事件监听器
  if (myChart) {
    myChart.dispose() // 销毁图表实例
  }
})
</script>

<style lang="scss" scoped>
.chart-one {
  width: 70%;
  height: 300px;
}

@media screen and (max-width: 768px) {
  .chart-one {
    width: 100%;
    height: 200px;
  }
}
</style>
