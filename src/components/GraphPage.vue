<script setup>
    import pieChart from './pieChart.vue'
    import barChart from './barChart.vue';
    import LineChart from './LineChart.vue'
    import GraphItem from './GraphItem.vue'
    import PolarAreaChart from './PolarAreaChart.vue'
</script>

<script>
    export default {
    data() {
        return {
        whichGraph: 0,
        lineVPolar: true,
        }
    }
    }
</script>

<template>
    <button 
        @click="whichGraph = 0"
        class="button"  
        :style="{
        color: whichGraph == 0 ? 'var(--color-red)' : 'var(--color-blue)',
        borderColor: whichGraph == 0 ? 'var(--color-red)' : 'var(--color-blue)',
      }"
    > 
        Languages Used
    </button>
    <button 
        @click="whichGraph = 1"
        class="button"  
        :style="{
        color: whichGraph == 1 ? 'var(--color-red)' : 'var(--color-blue)',
        borderColor: whichGraph == 1 ? 'var(--color-red)' : 'var(--color-blue)',
      }"
    > 
        Users by Commit
    </button>
    <button 
        @click="whichGraph = 2"
        class="button"  
        :style="{
        color: whichGraph == 2 ? 'var(--color-red)' : 'var(--color-blue)',
        borderColor: whichGraph == 2 ? 'var(--color-red)' : 'var(--color-blue)',
      }"
    > 
        Weekly Commits
    </button>

    <button 
        v-if="whichGraph == 2"
        @click="lineVPolar = true"
        class="buttonS"  
        :style="{
        color: lineVPolar == 3 ? 'var(--color-pink)' : 'var(--color-green)',
        borderColor: lineVPolar == 3 ? 'var(--color-pink)' : 'var(--color-green)',
      }"
    > 
        Line Chart
    </button>
    <button 
        v-if="whichGraph == 2"
        @click="lineVPolar = false"
        class="buttonS"  
        :style="{
        color: lineVPolar ? 'var(--color-green)' : 'var(--color-pink)',
        borderColor: lineVPolar == 3 ? 'var(--color-green)' : 'var(--color-pink)',
      }"
    > 
        Polar Chart
    </button>

    <GraphItem v-if="whichGraph == 0">
        <template #heading>Languages Used</template>
        <template #description>A pie chart describing the percentage of languages used in a repo.</template>
        <template #graph><pieChart/></template>
    </GraphItem>

    <GraphItem v-if="whichGraph == 1">
        <template #heading>Top Users</template>
        <template #description>A bar chart showing the users with the most amount of commits in a repo. </template>
        <template #graph><barChart/></template>
    </GraphItem>

    <GraphItem v-if="(whichGraph == 2) && lineVPolar">
        <template #heading>Weekly Commits</template>
        <template #description>A line chart describing the timeframe of weekly commits in a repo. </template>
        <template #graph><LineChart/></template>
    </GraphItem>

    <GraphItem v-if="(whichGraph == 2) && !lineVPolar">
        <template #heading>Weekly Commits</template>
        <template #description>A polar area chart describing the timeframe of weekly commits in a repo. </template>
        <template #graph><PolarAreaChart/></template>
    </GraphItem>
</template>

<style scoped>
    .button 
    {	
        margin-right: 50px;
        background-color: var(--color-background-mute);	
        border-width: 2px;	
        border-radius: 15px;	
        color: var(--color-blue); 	
        font-size: 20px;	
        font-weight: bold;	
        text-align: center;	
        text-decoration: none;	
        display: inline-block;	
        cursor: pointer;	
        width: 150px;	
        height: 75px;	
    }

    .buttonS
    {	
        margin-top: 15px;
        margin-right: 50px;
        background-color: var(--color-background-mute);	
        border-width: 2px;	
        border-radius: 15px;	
        color: var(--color-green); 	
        font-size: 15px;	
        font-weight: bold;	
        text-align: center;	
        text-decoration: none;	
        display: inline-block;	
        cursor: pointer;	
        width: 100px;	
        height: 50px;	
    }

    @media (max-width: 1024px) {	
        .button
        {
            margin-top: 30px;
        }

        .buttonS
        {
            margin-top: 30px;
        }
    }
</style>