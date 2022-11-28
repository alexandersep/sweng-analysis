<template>
  <div>
    <canvas 
      id = "polarAreaChart"
    />

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
        const daysInAWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const avgWeekCommits = res.data.average_commits_this_year;
        const trendLineForYear = [avgWeekCommits, avgWeekCommits, avgWeekCommits, avgWeekCommits, avgWeekCommits, avgWeekCommits, avgWeekCommits];
        const weeklyCommits = res.data.current_week_activity;
        const ctx = document.getElementById('polarAreaChart')
        const polarAreaChart = new Chart (ctx, {
          type: 'polarArea',
          data: {
            labels: daysInAWeek,
            datasets: [ {
              label: "Commits from the Past Week",
              data: weeklyCommits,
              backgroundColor: [
                '#fbf5f3',  // Snow
                '#e28413',  // Fulvous
                '#000022',  // Oxford Blue
                '#de3c4b',  // Rusty Red
                '#c42847',  // French Raspberry
                '#331832',  // Dark Purple
                '#d81e5b'   // Ruby
              ],
              borderColor: 'blue',
              borderWidth: 1
            }, {
              label: "Average Weekly Commits",
              data: trendLineForYear,
              backgroundColor: [
                '#f6bd60',  // Maximum Yellow Red
                '#f7ede2',  // Linen
                '#f5cac3',  // Baby Pink
                '#84a59d',  // Morning Blue
                '#f28482',  // Light Coral
                '#246eb9',  // Spanish Blue
                '#0d0630'   // Russian Violet
              ],
              borderColor: 'red',
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

<style>
  #polarAreaChart {
    max-height: 500px;
  }
</style>