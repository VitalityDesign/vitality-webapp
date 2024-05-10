<script setup>
import { provide, reactive} from "vue";
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
  <div class="app-container">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50"/>

      <div class="wrapper">
        <HelloWorld msg="gNB"/>
      </div>
    </header>

    <div class="main-container">
      <Menu/>
      <div class="main-wrapper" :style="{ 'margin-left': state.isCollapsed ? '50px' : '200px' }">
        <main>
          <TheWelcome/>
          <!--      <router-view/>-->
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>

.app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  place-items: flex-start;
  align-items: center;
  padding-right: calc(var(--section-gap) / 2);
  height: 60px;
  width: 100%;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: nowrap;
}

.logo {
  display: block;
  margin: 0 0.5rem 0 0.5rem;
}

.main-container {
  display: flex;
  margin-top: 60px;
  flex-grow: 1;
}

main {
  flex-grow: 1;
  position: relative;
}

.main-wrapper {
  display: flex;
  flex-grow: 1;
  transition: margin-left 0.3s ease;
}

</style>
