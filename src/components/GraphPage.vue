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
        showBar: false,
        showLine: false,
        showPie: false,
        }
    }
    }
</script>

<template>
    <button class="button"  @click="showLine = !showLine"> Weekly Commits</button>
    <button class="button"  @click="showPie = !showPie"> Languages Used</button>
    <button class="button"  @click="showBar = !showBar"> Top Users</button>

    <GraphItem v-if="showPie">
        <template #heading>Languages Used</template>
        <template #description>A pie chart describing the percentage of languages used in a repo.</template>
        <template #graph><pieChart/></template>
    </GraphItem>

    <GraphItem v-if="showBar">
        <template #heading>Top Users</template>
        <template #description>A bar chart showing the users with the most amount of commits in a repo. </template>
        <template #graph><barChart/></template>
    </GraphItem>

    <GraphItem v-if="showLine">
        <template #heading>Weekly Commits</template>
        <template #description>A line chart describing the timeframe of weekly commits. </template>
        <template #graph><lineChart/></template>
    </GraphItem>
</template>