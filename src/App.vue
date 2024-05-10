<script setup>
import {provide, reactive} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from "@/components/TheWelcome.vue";
import Menu from "@/components/Menu.vue";

// console.log(isCollapsed.value); // 打印 isCollapsed 的值
const state = reactive({
  isCollapsed: false
});

provide('isCollapsed', state);

</script>

<template>
  <el-container class="app-container">
    <el-header class="header-container">
      <div class="header-wrapper">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50"/>
        <div class="wrapper">
          <HelloWorld msg="gNB"/>
        </div>
      </div>
    </el-header>
    <el-container class="body-container">
      <el-aside :class="[state.isCollapsed ? 'aside-shrink' : 'aside-expand']">
        <Menu/>
      </el-aside>
      <div class="main-wrapper">
        <main>
          <TheWelcome/>
          <!--      <router-view/>-->
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
  margin: 0 0.5rem 0 0.5rem;
}

.body-container {
  height: calc(100vh - $height-header);
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
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
