<template>
    <div class="graphitem">
      <div class="details">
        <h3>
          <slot name="heading"></slot>
        </h3>
        <h1>
          <slot name="description"></slot>
        </h1>
        <slot class = "graph" name="graph"></slot>
      </div>
    </div>
</template>
  

<style scoped>
.graphitem {
  margin-top: 0px;
  margin-bottom: 100px;
  display: block;
}
.details {
  flex: 1;
}
h3 {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-blue);
}
h1 {
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  margin-left: 10px;
}
.graph {
    margin-bottom: 100px;
}
</style>