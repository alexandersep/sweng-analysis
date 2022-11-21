<script setup>
import HelloWorld from './components/HelloWorld.vue'
import barChart from './components/barChart.vue';
import radarChart from './components/radarChart.vue';
import pieChart from './components/pieChart.vue';
import TheWelcome from './components/TheWelcome.vue'
</script>

<script>
import axios from 'axios'
export default {
  //  data,
    data() {
        return {
            isVisible: false,
            isVisible2:false,
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
        
    },
    beforeMount() {
        this.get_metrics();
    },
    components: { TheWelcome,pieChart }
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
    <button class="button" style="left: -50px " @click="isVisible = !isVisible">Language Used {{ isVisible }}</button>
    <div v-if="isVisible" ><pieChart/></div>
    <button class="button" style="left: 100 " @click="isVisible2 = !isVisible2">radar chart {{ isVisible2 }}</button>
    <div v-if="isVisible2" ><radarChart/></div>


  </header>

  <main>
    <TheWelcome/>
  </main>
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
