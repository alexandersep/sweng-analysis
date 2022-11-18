<template>
    <div class="hello">
      <canvas id="myChart" width="400" height="100"></canvas>
    </div>
  
  </template>
  <script>
  import Chart from 'chart.js/auto';
  //import { apiData } from './api'
  // ...
  export default {
   /* name: 'HelloWorld',
    props: {
      msg: String
    },*/
    
    mounted(){
  console.log("component mounted")
  const ctx = document.getElementById('myChart')
  const data={
      labels:[ //here- where we should import the languages section of the data(from get metrics method?)
          'Assembly',
          'C',
          'C++',
          'Matlab',
          'Python',
          'Shell',
          'XS'
      ],
      datasets:[{
          label:' percentage of language used',
          data:[9562027,
          1172686451/100,
          306510,
          2482,
          1343777,
          3836500,
          1239
      ],
      backgroundColor: [
        //enough for additions to be made
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
          'rgb(238, 236, 228)'
        ]
      }],
     hoverOffset:4,
  }
  const myChart=new Chart(ctx,{
    type: 'doughnut',
    data: data,
      }
  );
  myChart;
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
  </style>