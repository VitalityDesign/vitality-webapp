<script setup>
import {inject} from 'vue';
import ToolingIcon from "@/components/icons/IconTooling.vue";

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
    <div class="nav-logo">
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
    <el-icon>
      <Expand v-show="!state.isCollapsed" @click="toggleMenu"/>
      <Fold v-show="state.isCollapsed" @click="toggleMenu"/>
    </el-icon>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #f9f9f9;
  padding: 20px;
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

.sidebar-collapsed {
  width: 50px;
}

.sidebar-expanded {
  width: 200px;
}

</style>
