<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="blue">{{ msg }}</h1>
    <h2>
        Software Engineering tool for github analysis.<br>
    </h2>
  </div>
</template>

<style scoped>
h2,
h1 {
  font-weight: 500;
  font-size: 1.6rem;
  top: -100px;
}

.greetings h1,
.greetings h2 {
  text-align: left;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h2 {
    text-align: left;
  }
}
</style>
