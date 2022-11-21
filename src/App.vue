<script setup>
import HelloWorld from './components/HelloWorld.vue'
import pieChart from './components/pieChart.vue';
import TheWelcome from './components/TheWelcome.vue'
import GraphPage from './components/GraphPage.vue'
</script>

<script>
import axios from 'axios'
export default {
  //  data,
    data() {
        return {
            onGraphs: false,
            owner: "",
            repo: "",
            languages: [],
            avg_commits: 0
        };
    },
    methods: {
        get_metrics: function () {
            var path = "http://localhost:9090/metrics";
            axios.get(path)
                .then((res) => {
                this.owner = res.data.owner;
                this.repo = res.data.repo;
                this.languages = res.data.languages;
                this.avg_commits = res.data.average_commits_this_year;
                console.log(this.owner, this.repo, this.languages, this.avg_commits);
            });
        },
        /* get_pieChart: function(){
           data: data={
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
   },
    myChart=new Chart(ctx,{
     type: 'doughnut',
     data: data2,
       }
   )   */
    },
    beforeMount() {
        this.get_metrics();
        //this.get_pieChart();
    },
    components: { TheWelcome }
}
</script>

<template>
  <header>
    <div>
      <custom-header v-bind:onGraphs="false" page-title="Home"></custom-header>
    </div>
    <img alt="Vue logo" class="logo" src="./assets/sweng-logo.svg" width="200" height="200" />
    <div class="wrapper">
      <HelloWorld msg="Software Engineering Analaysis" />
    </div>
    <button class="button" style="left: -300px;" @click="onGraphs = !onGraphs"> Go Home/Graph</button>

  </header>

  <main v-if="onGraphs == false">
    <TheWelcome/>
  </main>

  <graphs v-if="onGraphs">
    <GraphPage/>
  </graphs>
  
</template>

<style scoped>

header {
  line-height: 1.5;
}

.box {
  width: 50px;
  height: 200px;
  position: absolute;
  bottom: 20px;
}
.box2 {
  width: 50px;
  height: 175px;
  position: absolute;
  bottom: 20px;
  left: 50px;
}
.box3 {
  width: 50px;
  height: 100px;
  position: absolute;
  bottom: 20px;
  left: 100px;
}


.logo {
  display: block;
  margin: 0 auto 4rem;
  top: -50px;
}

@media (min-width: 1023px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
    position: absolute;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
