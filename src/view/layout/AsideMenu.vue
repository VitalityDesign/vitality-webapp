<script setup>
import {inject} from 'vue';
import {DataAnalysis, Document, Expand, Fold, HomeFilled, Setting, UserFilled} from "@element-plus/icons-vue";
import router from '@/router';
import logo from '@/assets/logo.svg';

const state = inject('isCollapsed');

const toggleMenu = () => {
  state.isCollapsed = !state.isCollapsed;
};

const toggleAccount = () => {
  console.log('toggle account');
};

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
  router.push(key);
};

</script>

<template>
  <div :class="['sidebar', state.isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded']">
    <div class="sidebar-header">
      <el-col class="folder-wrapper">
        <el-icon class="folder" @click="toggleMenu">
          <el-image title="logo" :src=logo class="logo"/>
        </el-icon>
      </el-col>
    </div>
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
            <Setting/>
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
    <div class="sidebar-footer">
      <el-col class="folder-wrapper">
        <el-icon class="account" @click="toggleAccount">
          <UserFilled/>
        </el-icon>
      </el-col>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/basics.scss";

.el-scrollbar {
  height: calc(100vh - $height-aside-header - $height-aside-footer);

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .el-scrollbar__view {
    height: 100%;
  }
}

.el-scrollbar .el-menu {
  background-color: var(--vt-c-white-mute);

  :deep(.el-menu-item .el-icon) {
    font-size: $width-aside-svg;
  }

  :deep(.el-sub-menu .el-icon:not(.el-sub-menu__icon-arrow)) {
    font-size: $width-aside-svg;
  }
}

.sidebar {
  display: flex;
  position: fixed;
  flex-direction: column;
  height: 100%;
  background-color: var(--vt-c-white-mute);
  box-shadow: 0 0 20px #f2f2f2;
  border-radius: 10px;
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

.sidebar-header {
  display: flex;
  align-items: center;
  height: $height-aside-footer;
}

.sidebar-header .folder-wrapper {
  width: $width-aside-collapsed;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: var(--gnb-menu-item-padding-left);
  .folder {
    cursor: pointer;
    font-size: $width-aside-svg;
  }
}

.sidebar-footer {
  display: flex;
  align-items: center;
  height: $height-aside-footer;
}

.sidebar-footer .folder-wrapper {
  width: $width-aside-collapsed;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: var(--gnb-menu-item-padding-left);
  .account {
    cursor: pointer;
    font-size: $width-aside-svg;
  }
}

</style>
