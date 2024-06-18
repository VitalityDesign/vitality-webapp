<script setup>
import {inject} from 'vue';
import {Clock, DataAnalysis, Document, Expand, Fold, HomeFilled, Odometer, Setting} from "@element-plus/icons-vue";
import IconDocumentation from "@/components/icons/IconDocumentation.vue";

const state = inject('isCollapsed');

const toggleMenu = () => {
  state.isCollapsed = !state.isCollapsed;
};

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

</script>

<template>
  <div :class="['sidebar', state.isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded']">
    <div class="sidebar-scrollbar">
      <el-scrollbar class="scrollbar-style">
        <el-menu
            class="el-menu-vertical-demo"
            router
            :collapse="state.isCollapsed"
            :collapse-transition="false"
            default-active="2"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
        >
          <el-menu-item index="1">
            <icon>
              <HomeFilled/>
            </icon>
            <template #title>Overview</template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Document/>
              </el-icon>
              <span>Logging</span>
            </template>
            <el-menu-item index="2-1">
              <template #title>System Log</template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template #title>Module Log</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon>
              <DataAnalysis/>
            </el-icon>
            <template #title>Performance</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting/>
            </el-icon>
            <template #title>Settings</template>
          </el-menu-item>
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
  .el-scrollbar__view {
    height: 100%;
  }
}

.scrollbar-style {
  height: calc(100vh - $height-header - $height-aside-footer);
}

.sidebar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  height: calc(100vh - $height-header);
  background-color: #e0e4ea;
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) .el-icon {
  font-size: 20px; /* Adjust this value as needed */
  width: 20px;
  min-height: 20px;
}

.el-menu-vertical-demo {
  border: none;

  .el-menu-item {
    span {
      color: #909399;
      font-size: 16px;
    }
  }

  .el-submenu {
    span {
      color: #909399;
      font-size: 16px;
    }

    .el-menu-item {
      span {
        color: #909399;
        font-size: 14px;
      }
    }
  }
}

</style>
