<script setup>
import {provide, reactive} from "vue";
import AsideMenu from "@/view/layout/AsideMenu.vue";

const state = reactive({
  isCollapsed: false
});

provide('isCollapsed', state);

</script>

<template>
  <el-container class="app-container">
    <el-container class="body-container">
      <el-aside :class="[state.isCollapsed ? 'aside-shrink' : 'aside-expand', 'aside-wrapper']">
        <AsideMenu/>
      </el-aside>
      <div class="main-wrapper">
        <main>
          <router-view/>
        </main>
      </div>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@import "@/style/basics.scss";

.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.logo {
  display: block;
  justify-content: flex-start;
  width: $width-aside-svg;
  margin: 0 0.5rem 0 0.75rem;
}

.body-container {
  height: calc(100vh - $height-header);
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
}

.aside-wrapper {
  flex-shrink: 0;
  height: 100%;
}

.aside-expand {
  width: $width-aside;
}

.aside-shrink {
  width: $width-aside-collapsed;
}

.main-wrapper {
  display: flex;
  flex-grow: 1;
}

main {
  flex-grow: 1;
  position: relative;
  padding: 0;
}

</style>
