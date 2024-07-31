<script setup>
import WelcomeItem from "@/components/WelcomeItem.vue";
import DocumentationIcon from "@/components/icons/IconTechnology.vue";

defineOptions({
  name: "VitalitySubject",
});
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener"
      >official documentation</a
    >
    provides you with all information you need to get started.
  </WelcomeItem>
</template>

<style scoped></style>
