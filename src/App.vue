<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
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
  display: block;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}
.logo {
    margin: 0 0 50px 0;
  }
  header .wrapper {
    margin: 0 0 -75px 0;
  }
  header .button {
    margin: 0 0 0 0;
  }
@media (max-width: 1023px) {
  .main{
    top: 100px;
  }
}
</style>