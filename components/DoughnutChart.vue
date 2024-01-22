<template>
  <Doughnut :data="chartData" :options="chartOptions" class="doughnut" />  
</template>
<script>
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'App',
  components: {
    Doughnut
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
.doughnut {
  height: 140px;
}
</style>