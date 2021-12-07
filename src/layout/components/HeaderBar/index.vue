<template>
  <el-header class="header-bar" height="60px">
    <div class="nav-bar flex-auto flex justify-between items-center h-full">
      <router-link to="/">
        <img v-if="logo" :src="logo" class="logo" alt="logo">
      </router-link>
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        class="flex-grow ml-16"
        :active-text-color="variables.mainColor"
      >
        <head-bar-menu-item v-for="route in sidebarRouters" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <div class="flex flex-row flex-wrap align-middle">
        <ita-button>账号登录</ita-button>
        <ita-button type="primary">账号注册</ita-button>
      </div>
    </div>
  </el-header>
</template>

<script>
import Logo from '@/assets/images/logo.png'
import ItaButton from '@/components/ItaButton'
import HeadBarMenuItem from './HeadBarMenuItem'
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'HeaderBar',
  components: {
    ItaButton,
    HeadBarMenuItem
  },
  data() {
    return {
      title: '河南省新创综合服务保障中心',
      logo: Logo
    }
  },
  computed: {
    ...mapGetters([
      'sidebarRouters',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.header-bar {

  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.10);
  @apply bg-white;

  .logo {
    height: 60px;
  }
  .nav-bar {
    @apply m-auto;
    max-width: 1200px;
  }

  // 设置选中的菜单没有颜色
  ::v-deep .el-menu--horizontal {
    border-bottom-color: transparent;
    > .el-menu-item.is-active{
      border-bottom-color: transparent;
    }

  }
  ::v-deep .el-submenu__icon-arrow {
    display: none !important;
  }

  // 设置选中的菜单的样式
  ::v-deep.el-menu {
    & {
      .is-active {
        border-bottom: 2px solid $mainColor;
      }
    }
  }
}
</style>
