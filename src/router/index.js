import router from './routers'
// eslint-disable-next-line no-unused-vars
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

// 如果后台可以动态加载菜单，请使用这个
// eslint-disable-next-line no-unused-vars
import { buildMenus } from '@/api/system/menu'
// eslint-disable-next-line no-unused-vars
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// eslint-disable-next-line no-unused-vars
const whiteList = ['/login', '/']// no redirect whitelist
// const requireLoginPagePrefix = '/manage'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(() => { // 拉取user_info
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }

      if (store.getters.constantsMenuLoad) {
        next()
      } else {
        loadMenus(next, to)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }

  // 如果访问的是后台页面 测试时使用的方法
  // if (to.path.startsWith(requireLoginPagePrefix)) {
  //   if (getToken()) { // 如果已经登陆了
  //     next()
  //   } else { // 如果没有登陆，就跳转到登陆页面
  //     next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
  //   }
  // } else {
  //   if (store.getters.constantsMenuLoad) {
  //     next()
  //   } else {
  //     loadMenus(next, to)
  //   }
  // }
  // NProgress.done()
})

// 如果后台可以动态加载菜单，请使用下面的代码
export const loadMenus = (next, to) => {
  // buildMenus().then(res => {
  //   const sdata = JSON.parse(JSON.stringify(res))
  //   const rdata = JSON.parse(JSON.stringify(res))
  //   const sidebarRoutes = filterAsyncRouter(sdata)
  //   const rewriteRoutes = filterAsyncRouter(rdata, false, true)
  //   rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
  //
  //   store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
  //     router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
  //     next({ ...to, replace: true })
  //   })
  //   store.dispatch('SetSidebarRouters', sidebarRoutes)
  // })

  store.dispatch('SetConstantRouters')
  next({ ...to, replace: true })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
