<script setup>
    import pieChart from './pieChart.vue'
    import barChart from './barChart.vue';
    import LineChart from './LineChart.vue'
    import GraphItem from './GraphItem.vue'
</script>

<script>
    export default {
    data() {
        return {
        whichGraph: 0,
        }
    }
    }
</script>

<template>
    <button class="button"  @click="whichGraph = 0"> Weekly Commits</button>
    <button class="button"  @click="whichGraph = 1"> Languages Used</button>
    <button class="button"  @click="whichGraph = 2"> Top Users</button>

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

    <GraphItem v-if="whichGraph == 2">
        <template #heading>Weekly Commits</template>
        <template #description>A line chart describing the timeframe of weekly commits. </template>
        <template #graph><lineChart/></template>
    </GraphItem>
</template>

<style scoped>
    .button 
    {	
        margin-right: 50px;
        background-color: var(--color-background-mute);	
        border-width: 2px;	
        border-color: var(--color-blue);	
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

    @media (max-width: 1024px) {	
        .button
        {
            margin-top: 30px;
        }
    }
</style>