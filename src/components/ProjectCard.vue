<script setup>
defineProps(["title"]);
defineEmits(["enter-project"]);
</script>

<template>
  <el-card @click="$emit('enter-project')">
    <template #header>
      <div class="header">
        <div v-if="$slots.header">
          <slot name="header" />
        </div>
        <span v-else>{{ title }}</span>
      </div>
    </template>
    <slot />
  </el-card>
</template>

<style scoped></style>
