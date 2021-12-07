<!--
 * @Author: your name
 * @Date: 2021-12-06 14:24:44
 * @LastEditTime: 2021-12-06 15:32:53
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \eladmin-web\src\views\upload\index.vue
-->
<template>
  <div>
    <ita-side-bar
      bar-title="上传管理"
      :router-name="routerRootName"
      :root-routers="$store.state.permission.routers"
    />
    <div class="sub-container">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import ItaSideBar from './ItaSideBar'

export default {
  components: {
    ItaSideBar
  },
  data() {
    return {
      routerRootName: 'UploadManage',
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
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  created() {
    const routers = this.$store.state.permission.routers
    const [a, b] = this.getTargetRouter(routers, this.routerRootName)
    this.menuRouters = a
    this.basePath = b
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

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
.sub-container {
  margin-left: $sideBarWidth;
  padding: 20px;
  background: #f8f8f8;
  height: calc(100vh - 60px);

  .content-container {
    width: 100%;
  }
}
</style>
