<script setup>
import HelloWorld from './components/HelloWorld.vue'
import barChart from './components/barChart.vue';
import pieChart from './components/pieChart.vue';
import TheWelcome from './components/TheWelcome.vue'
import LineChart from './components/LineChart.vue'
import GraphPage from './components/GraphPage.vue'
</script>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      onGraphs: false, 
      owner: '',
      repo: '',
      languages: [],
      avg_commits: 0,
      ratio: []
    }
  },
  methods: {
    get_metrics: function()  {
      var path = 'http://localhost:9090/metrics'
      axios.get(path)
      .then((res) => {
        this.owner = res.data.owner;
        this.repo = res.data.repo;
        this.languages = res.data.languages;
        this.avg_commits = res.data.average_commits_this_year;
        this.ratio = res.data.ratio;
        console.log(this.owner, this.repo, this.languages, this.avg_commits);
      })
    }
  },
  beforeMount(){
    this.get_metrics()
  }
}
</script>

<template>
  <header>
    <div>
      <custom-header v-bind:isVisible="false" page-title="Home"></custom-header>
    </div>
    <img alt="Vue logo" class="logo" src="./assets/sweng-logo.svg" width="200" height="200" />
    <div class="wrapper">
      <HelloWorld msg="Software Engineering Analaysis" />
    </div>
    <button class="button"  v-if="onGraphs == false" @click="onGraphs = !onGraphs"> Go To Graphs</button>
    <button class="button"  v-if="onGraphs == true" @click="onGraphs = !onGraphs"> Go To Home</button>

  </header>
  
  <main v-if="onGraphs == false" class="main">
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
