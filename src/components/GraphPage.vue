<script setup>
    import HelloWorld from './HelloWorld.vue'
    import pieChart from './pieChart.vue'
    import GraphItem from './GraphItem.vue'
</script>


<template>
    <GraphItem style="top: 50px;">
        <template #heading>Languages Used</template>
        <template #description>A pie chart describing the percentage of a user's languages used across all repos.</template>
        <template #graph><pieChart/></template>
    </GraphItem>
    <GraphItem>
        <template #heading>Languages Used 2!</template>
        <template #description>A second pie chart describing the percentage of a user's languages used across all repos.</template>
        <template #graph><pieChart/></template>
    </GraphItem>
    <GraphItem>
        <template #heading>Languages Used 3!</template>
        <template #description>A second pie chart describing the percentage of a user's languages used across all repos. This here is testing a really really long string.</template>
        <template #graph><pieChart/></template>
    </GraphItem>
</template>