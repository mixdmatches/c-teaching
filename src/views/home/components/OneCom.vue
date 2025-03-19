<template>
  <!-- 折线图 -->
  <div class="chart-one" ref="one"></div>
</template>

<script setup>
// 每一章知识点数量的分布
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  pointList: Array,
})
const one = ref()
let myChart // 定义 myChart 变量
onMounted(() => {
  const myChart = echarts.init(one.value)
  const option = {
    title: {
      text: '每周学习时长（分钟）',
      left: 'center',
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
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
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
</script>

<style lang="scss" scoped>
.chart-one {
  width: 70%;
  height: 300px;
}
</style>
