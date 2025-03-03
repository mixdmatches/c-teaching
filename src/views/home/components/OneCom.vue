<template>
  <!-- 折线图 -->
  <div class="chart-one" ref="one"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const one = ref()
onMounted(() => {
  const myChart = echarts.init(one.value)
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
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
