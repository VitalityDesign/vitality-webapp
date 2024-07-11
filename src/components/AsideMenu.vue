<script setup>
import {inject, onMounted, watch} from 'vue';
import {Clock, DataAnalysis, Document, Expand, Fold, HomeFilled, Odometer, Setting} from "@element-plus/icons-vue";
import router from '@/router'

const state = inject('isCollapsed');

const toggleMenu = () => {
  state.isCollapsed = !state.isCollapsed;
};

onMounted(() => {
  updatePadding();
});

watch(() => state.isCollapsed, () => {
  updatePadding();
});

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
  router.push(key);
};

function updatePadding() {
  const paddingLeftValue = state.isCollapsed ? '10px' : '20px';
  document.documentElement.style.setProperty('--menu-item-padding-left', paddingLeftValue);
}

</script>

<template>
  <div :class="['sidebar', state.isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded']">
    <div class="sidebar-scrollbar">
      <el-scrollbar class="scrollbar-style">
        <el-menu
            default-active="/overview"
            :collapse="state.isCollapsed"
            :collapse-transition="false"
            @select="handleSelect"
        >
          <el-menu-item index="/overview">
            <el-icon>
              <HomeFilled/>
            </el-icon>
            <template #title>
              <span>Overview</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/performance">
            <el-icon>
              <DataAnalysis/>
            </el-icon>
            <template #title>
              <span>Performance</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/settings">
            <el-icon>
              <setting/>
            </el-icon>
            <template #title>
              <span>Settings</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="/logging">
            <template #title>
              <el-icon>
                <Document/>
              </el-icon>
              <span>Logging</span>
            </template>
            <el-menu-item index="/logging/system">
              <template #title>
                <span>System Log</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/logging/module">
              <template #title>
                <span>Module Log</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="sidebar-footer">
      <el-col class="folder-wrapper">
        <el-icon class="folder" @click="toggleMenu">
          <Expand v-show="!state.isCollapsed"/>
          <Fold v-show="state.isCollapsed"/>
        </el-icon>
      </el-col>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/basics.scss";

.el-scrollbar {
  padding-top: 20px;

  .el-scrollbar__view {
    height: 100%;
  }
}

.scrollbar-style {
  height: calc(100vh - $height-header - $height-aside-footer);
}

.sidebar {
  display: flex;
  position: fixed;
  flex-direction: column;
  height: calc(100vh - $height-header);
  background-color: #f4f9ff;
}

.sidebar-collapsed {
  width: $width-aside-collapsed;
}

.sidebar-expanded {
  width: $width-aside;
}

.sidebar-scrollbar {
  flex-grow: 1;
}

.sidebar-footer {
  position: relative;
  display: flex;
  align-items: center;
  height: $height-aside-footer;
}

.sidebar-footer .folder-wrapper {
  width: $width-aside-collapsed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-footer .folder-wrapper .folder {
  position: relative;
  width: $width-aside-icon;
  height: $height-aside-icon;
  color: var(--vt-c-black-soft);
  cursor: pointer;
  z-index: 100;
}

.el-menu--vertical {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  list-style-type: none;
  padding-left: 0;
}

.el-menu--vertical :deep(ul) {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
}

.el-menu--vertical :deep(span) {
  display: flex;
  flex-grow: 1;
  list-style-type: none;
  padding-left: 0;
}

.el-menu--vertical :deep(.el-icon) {
  display: flex;
  align-items: center;
  margin-right: $margin-aside-icon;

  svg {
    height: $height-aside-svg; /* Adjust height if necessary */
    width: $width-aside-svg; /* Adjust width if necessary */
  }
}

.el-menu--vertical :deep(.el-menu-item) {
  display: flex;
  flex-grow: 1;
  height: $height-aside-title;
  padding-left: var(--menu-item-padding-left);
  align-items: center;
}

.el-menu--vertical .el-sub-menu {
  .el-menu .el-menu-item {
    padding-left: $padding_aside * 2;
  }
}

.el-menu--vertical :deep(.el-sub-menu__title) {
  display: flex;
  height: $height-aside-title;
  padding-left: var(--menu-item-padding-left);
  align-items: center;
  flex-grow: 1;
}

.el-menu--vertical :deep(.el-sub-menu__icon-arrow) {
  height: $height-aside-arrow;
  width: $width-aside-arrow;
}

.el-menu--collapse .el-sub-menu__title {
  span {
    display: none;
  }
}

.el-menu--collapse .el-sub-menu__icon-arrow {
  display: none;
}

</style>
