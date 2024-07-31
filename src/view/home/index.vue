<script setup>
import ProjectCard from "@/components/ProjectCard.vue";
import { ref } from "vue";

defineOptions({
  name: "VitalityHome",
});

const posts = ref([
  { id: 1, title: "My journey with Vue", num: 0 },
  { id: 2, title: "Blogging with Vue", num: 0 },
  { id: 3, title: "Why Vue is so fun", num: 0 },
]);

function EnterProject(num) {
  posts.value[num].num += 1;
}
</script>

<template>
  <ProjectCard
    v-for="(post, index) in posts"
    :key="post.id"
    :title="post.title + post.num"
    @enter-project="EnterProject(index)"
  >
    <el-descriptions>
      <el-descriptions-item label="Official Documentation">
        Vue’s
        <a href="https://vuejs.org/" target="_blank" rel="noopener"
          >official documentation</a
        >
        provides you with all information you need to get started.
      </el-descriptions-item>
    </el-descriptions>
  </ProjectCard>
</template>

<style scoped></style>
