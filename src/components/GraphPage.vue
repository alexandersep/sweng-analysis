<script setup>
    import HelloWorld from './HelloWorld.vue'
    import pieChart from './pieChart.vue'
    import GraphItem from './GraphItem.vue'
</script>


<template>
    <GraphItem>
        <template #heading>Languages Used</template>
        <template #description>A pie chart describing the percentage of a user's languages used across all repos.</template>
        <template #graph><pieChart/></template>
    </GraphItem>

</template>