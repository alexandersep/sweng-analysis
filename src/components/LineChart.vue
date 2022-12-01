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

        // Calculations for daily average.
        const avgDailyCommits = res.data.average_commits_this_year / 7;
        const trendLineForYear = [avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits];
        const weeklyCommits = res.data.current_week_activity;

        // Calculations for running average.
        //var weeklyCommits = res.data.current_week_activity;
        //var avgDailyCommits = []
        //var runningTotal = 0;
        //for (let index = 0; index < Object.values(weeklyCommits).length; index++) {
        //  runningTotal += Object.values(weeklyCommits)[index];
        //  avgDailyCommits[index] = runningTotal / (index + 1);
        //}
        const ctx = document.getElementById('lineWeekChart')
        var lineChart = new Chart (ctx, {
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
              label: "Average Daily Commits",
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
