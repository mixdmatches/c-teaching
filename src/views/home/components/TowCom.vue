<template>
  <div class="chart-tow" ref="tow"></div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  points: Array,
})

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
        data: [
          { value: 20, name: '简单' },
          { value: 20, name: '中等' },
          { value: 20, name: '困难' },
          { value: 20, name: '地狱' },
          { value: 20, name: '无敌' },
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
