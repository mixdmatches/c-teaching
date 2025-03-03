<template>
  <div class="chart-tow" ref="tow"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const tow = ref()
onMounted(() => {
  const myChart = echarts.init(tow.value)
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
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
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  }
  myChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.chart-tow {
  // 占去剩下的空间
  flex: 1;
  height: 300px;
}
</style>
