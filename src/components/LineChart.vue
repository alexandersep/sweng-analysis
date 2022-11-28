<template>
  <div>
    <canvas 
      id = "lineWeekChart"
      width = "400"
      height = "400" />
  </div>
</template>

<script>
  import Chart from 'chart.js/auto'
  import axios from 'axios'

  export default {
    mounted () {
      var metrics = "http://localhost:9090/metrics"
      axios.get(metrics)
      .then((res) => {
        var weeklyCommits = res.data.current_week_activity;
        const ctx = document.getElementById('lineWeekChart')
        const lineChart = new Chart (ctx, {
          type: 'line',
          data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [ {
              label: "Commits for the past Week",
              data: weeklyCommits,
              backgroundColor: ['red', 'blue'],
              borderColor: 'white',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            lineTension: 0, // Affects intensity of line curvature. Range of 0 - 1 for most ideal effects.
            scales: {
              y: {
                beginAtZero: true,
              }
            }
          }
        })
      })
    }
  }
</script>
