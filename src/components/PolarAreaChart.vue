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

        // Calculations for average running commits.
        const avgDailyCommits = res.data.average_commits_this_year / 7;
        const trendLineForYear = [avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits, avgDailyCommits];
        const weeklyCommits = res.data.current_week_activity;

        const repo = res.data.repo;
        const owner = res.data.owner;
        const uptimeInWeeks = Math.floor(res.data.issue_time);
        const uptimeInRemainingDays = Math.floor((res.data.issue_time - uptimeInWeeks) * 7)

        // Calculations for running daily average commits.
        //var weeklyCommits = res.data.current_week_activity;
        //var avgDailyCommits = []
        //var runningTotal = 0;
        //for (let index = 0; index < Object.values(weeklyCommits).length; index++) {
        //  runningTotal += Object.values(weeklyCommits)[index];
        //  avgDailyCommits[index] = runningTotal / (index + 1);
        //}
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
                'rgb(255, 0, 0, 200)'   // Ruby
              ],
              borderColor: 'blue',
              borderWidth: 1
            }, {
              label: "Average Daily Commits",
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
            plugins: {
              title: {
                display: true,
                text: [("Repository: " + repo + ", Owner: " + owner),  
                  (repo + " has been active for " + uptimeInWeeks + " weeks and " + uptimeInRemainingDays + " days")]  // New line.
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