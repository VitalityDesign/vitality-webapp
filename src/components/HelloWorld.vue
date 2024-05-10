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
    <h1 class="green">{{ msg }}</h1>
    <h3>
      local manager for
      <a href="https://www.srsran.com/" target="_blank" rel="noopener">srsRAN</a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2rem;
  position: relative;
  margin-right: 0.3rem;
}

h3 {
  font-size: 1rem;
}

.greetings {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
