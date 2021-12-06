<template>
  <div class="ita-side-bar">
    <div v-if="barTitle" class="ita-sidebar-title">
      {{ barTitle }}
    </div>
    <el-menu
      :default-active="activeSubMenu"
      :active-text-color="variables.mainColor"
    >
      <el-submenu :index="basePath">
        <template slot="title">
          <span>{{ menuRouters.meta.title }}</span>
        </template>
        <div v-for="route in menuRouters.children" :key="route.path">
          <router-link v-if="!route.hidden" :to="resolvePath(route.path)">
            <el-menu-item :index="resolvePath(route.path)">
              {{ route.meta.title }}
            </el-menu-item>
          </router-link>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'ItaSubBar',
  props: {
    barTitle: {
      type: String
    },
    menuTitle: {
      type: String,
      default: '菜单'
    },
    rootRouters: {
      type: Array,
      required: true
    },
    routerName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuRouters: {
        meta: {
          title: ''
        },
        children: []
      },
      basePath: ''
    }
  },
  computed: {
    activeSubMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  },
  created() {
    [this.menuRouters, this.basePath] = this.getTargetRouter(this.rootRouters, this.routerName)
  },
  mounted() {
  },
  methods: {
    getTargetRouter(router, routerName) {
      // const basePath = router.path
      let [_result, _path] = [null, '']
      for (let i = 0; i < router.length; i++) {
        const _route = router[i]
        if (routerName === _route.name) {
          [_result, _path] = [_route, _route.path]
          break
        } else {
          if (_route.children && _route.children.length > 0) {
            [_result, _path] = this.getTargetRouter(_route.children, routerName)
            _path = path.resolve(_route.path, _path)
            if (_result) break
          }
        }
      }
      return [_result, _path]
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.ita-side-bar {
  width: $sideBarWidth;
  height: 100%;
  position: fixed;
  top: $headerBarHeight;
  bottom: 0;
  left: 0;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
  background: #ffffff;

  .ita-sidebar-title {
    @apply flex flex-auto justify-start items-center;
    padding-left: 18px;
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
  }

  ::v-deep.el-menu {
    border: none;
  }

  ::v-deep.el-submenu__title {
    padding-left: 14px;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
  }

  ::v-deep.el-submenu .el-menu-item {
    height: 36px;
    line-height: 36px;
    min-width: inherit;

    font-size: 12px;
    font-weight: 400;
    color: #333333;
  }
}
</style>
