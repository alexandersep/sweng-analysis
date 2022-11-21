<template>
    <div class="hello">
      <canvas id="myChart" width="400" height="100"></canvas>
    </div>
  
  </template>

  <script>
import { Chart } from 'chart.js';

export default{
    mounted(){
        console.log("component mounted")
  const ctx = document.getElementById('myChart')
  const data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: 'sample data1',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'sample data2',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};
const myChart = new Chart(ctx, {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
});
myChart;
    }
}

</script>