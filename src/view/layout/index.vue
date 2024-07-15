<script setup>
import {provide, reactive} from "vue";
import TitleHeader from '@/view/layout/TitleHeader.vue'
import AsideMenu from "@/view/layout/AsideMenu.vue";

const state = reactive({
  isCollapsed: false
});

provide('isCollapsed', state);

</script>

<template>
  <el-container class="app-container">
    <el-header class="header-container">
      <div class="header-wrapper">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30"/>
        <div class="wrapper">
          <TitleHeader msg="gNB"/>
        </div>
      </div>
    </el-header>
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

.header-container {
  height: $height-header;
}

.header-wrapper {
  position: fixed;
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  height: $height-header;
  width: 100%;
}

.header-wrapper .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.logo {
  display: block;
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
