<template>
    <div class="graph">
      <div class="details">
        <h3>
          <slot name="heading"></slot>
        </h3>
        <h1>
          <slot name="description"></slot>
        </h1>
        <slot name="graph"></slot>
      </div>
    </div>
</template>
  

<style scoped>
.graph {
  margin-top: 0rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-blue);
}

h1 {
  font-size: 0.8rem;
  font-weight: 300;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

</style>
