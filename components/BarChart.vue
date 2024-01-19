<template>
  <Bar :data="chartData" :options="chartOptions" class="barchart" />  
</template>
<script>
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'App',
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object
    },
    chartOptions: {
      type: Object
    },
  },
}
</script>
<style>
.barchart {
  height: auto;
}
</style>