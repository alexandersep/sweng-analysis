<script setup>
import Chart from 'chart.js/auto';
</script>
<template>
  <div class="hello">
    <canvas id="myChart"></canvas>
  </div>

</template>
<script>
import axios from 'axios'

export default {
  mounted() {
    // var data = null;
    var path = "http://localhost:9090/metrics";
    axios.get(path)
      .then((res) => {
        var languages = res.data.languages;
        console.log(languages)
        const ctx = document.getElementById('myChart')
        const total = Object.values(languages).reduce((sum, a) => sum + a, 0);
        console.log(total);
        const percentages = [];
        for (let index = 0; index < Object.values(languages).length; index++) {
          percentages[index] = Object.values(languages)[index] / total * 100;
        }
        
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(languages),
            datasets: [{
              label: 'percentage',
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(0, 120, 0)',
                'rgb(219, 255, 51)',
                'rgb(51, 255, 189)',
                'rgb(131, 51, 255)',
                'rgb(252, 51, 255)',
                'rgb(16, 2, 16)',
                'rgb(233, 113, 235)',
                'rgb(235, 172, 113)',
                'rgb(238, 236, 228)',
              ],
              hoverOffset: 4,
              data: percentages
            }]
          }
        });
        myChart;
      })
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#myChart {
    max-height: 30%px;
  }
</style>