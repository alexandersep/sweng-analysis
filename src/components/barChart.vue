<script setup>
import Chart from 'chart.js/auto';
</script>
<template>
    <div class="hello">
      <canvas 
        id="barChart" 
      />
    </div>
  
  </template>

  <script>
import axios from 'axios'
export default{
mounted(){
    // var data = null;
    var path = "http://localhost:9090/metrics";
    axios.get(path)
      .then((res) => {
        var commits = res.data.commits_map;
        console.log(commits)
        const ctx = document.getElementById('barChart')
        const repo = res.data.repo;
        const owner = res.data.owner;
        const uptimeInWeeks = Math.floor(res.data.issue_time);
        const uptimeInRemainingDays = Math.floor((res.data.issue_time - uptimeInWeeks) * 7)

        var myChart = new Chart(ctx, {
         
 //const labels = Utils.months({count: 7});
 type: 'bar',
   data: {
  labels: Object.keys(commits),
  datasets: [{
    label: 'commits per user in repo',
    data: Object.values(commits),
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
},
options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
              title: {
                display: true,
                text: [("Repository: " + repo + ", Owner: " + owner),  
                  (repo + " has been active for " + uptimeInWeeks + " weeks and " + uptimeInRemainingDays + " days")]  // New line.
              }
            }
  },
        })
        myChart;
    })
}
}
</script>