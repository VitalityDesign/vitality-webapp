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
};

const menuList = router.options.routes[0].children;

console.log(menuList)

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
          default-active="0"
          :router="true"
          :collapse="state.isCollapsed"
          :collapse-transition="false"
          @select="handleSelect"
      >
        <template v-for="(item, index) in menuList" :key="index">
          <el-menu-item v-if="!item.children" :index="index" :route="item.path">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>

          <el-sub-menu v-else :index="index">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(sub, subIndex) in item.children"
                          :index="index + '-' + subIndex"
                          :route="item.path + '/' + sub.path"
            >
              <el-icon>
                <component :is="sub.icon"></component>
              </el-icon>
              <template #title>
                <span>{{ sub.name }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
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
