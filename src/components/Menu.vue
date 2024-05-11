<script setup>
import {inject} from 'vue';
import {Expand, Fold} from "@element-plus/icons-vue";

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
      <el-scrollbar>
        <span>
          <span v-show="!state.isCollapsed">通讯录管理</span>
        </span>
        <el-radio-group v-model="state.isCollapsed" style="margin-bottom: 20px;">
          <i v-show="!state.isCollapsed" class="el-icon-s-fold expandBtn" @click="state.isCollapsed=true"></i>
          <i v-show="state.isCollapsed" class="el-icon-s-fold shrinkBtn" @click="state.isCollapsed=false"></i>
        </el-radio-group>
        <el-menu
            class="el-menu-vertical-demo"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="state.isCollapsed"
            @select="handleSelect"
        >
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">Option 1</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">Option 2</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">Option 3</span>
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

.sidebar {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  color: #000000;
  cursor: pointer;
  z-index: 100;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
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
