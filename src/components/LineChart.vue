<template>
  <div>
    <canvas 
      id = "lineWeekChart"
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
        const ctx = document.getElementById('lineWeekChart')
        const lineChart = new Chart (ctx, {
          type: 'line',
          data: {
            labels: daysInAWeek,
            datasets: [ {
              label: "Commits from the Past Week",
              data: weeklyCommits,
              backgroundColor: 'blue',
              borderColor: 'white',
              borderWidth: 1
            }, {
              label: "Average Weekly Commits",
              data: trendLineForYear,
              backgroundColor: 'red',
              borderColor: 'gray',
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
