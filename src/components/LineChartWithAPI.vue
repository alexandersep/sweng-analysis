<template>
    <div class = "container">
      <Line v-if = "loaded" :chart-data="chartData" />
    </div>
</template>


<script>
    import { Line } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

    export default {
      name: 'LineChartWithAPI',
      components: { Line },
      data: () => ({
        loaded: false,
        chartData: null
      }),
      async mounted () {
        this.loaded = false
      
        try {
          const { userlist } = await fetch('/api/userlist')
          this.chartdata = userlist
        
          this.loaded = true
        } catch (e) {
          console.error(e)
        }
      }
    }
</script>