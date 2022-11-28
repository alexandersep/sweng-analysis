<script setup>
    import pieChart from './pieChart.vue'
    import barChart from './barChart.vue';
    import LineChart from './LineChart.vue'
    import GraphItem from './GraphItem.vue'
</script>


<template>
    <GraphItem>
        <template #heading>Languages Used</template>
        <template #description>A pie chart describing the percentage of a user's languages used across all repos.</template>
        <template #graph><pieChart/></template>
    </GraphItem>

</template>