import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', icon: 'index', affix: true, noCache: true },
    hidden: true,
    redirect: '/main',
    children: [
      {
        path: '/main',
        component: (resolve) => require(['@/views/home'], resolve),
        hidden: true,
        alias: '/'
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: 'news/industry',
    meta: { title: '新闻中心', icon: 'el-icon-s-claim' },
    children: [
      {
        path: 'industry',
        component: () => import('@/views/news'),
        name: 'Industry',
        meta: { title: '行业新闻', icon: 'el-icon-s-claim' }
      },
      {
        path: 'realtime',
        component: () => import('@/views/news'),
        name: 'RealTime',
        props: true,
        meta: { title: '实时动态', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '问题反馈', icon: 'el-icon-s-claim' },
    children: [
      {
        path: '',
        component: () => import('@/views/news')
      }
    ]
  },
  {
    path: '/resources',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Resources',
    meta: { title: '资源中心', icon: 'component' },
    children: [
      {
        path: 'knowledge',
        component: () => import('@/views/news'),
        name: 'Knowledge',
        meta: { title: '知识查询', icon: 'tree' }
      },
      {
        path: 'videos',
        component: () => import('@/views/news'),
        name: 'Videos',
        meta: { title: '视频学习', icon: 'el-icon-s-platform' }
      },
      {
        path: 'drivers',
        component: () => import('@/views/resources/drivers'),
        name: 'Drivers',
        meta: { title: '驱动下载', icon: 'el-icon-s-platform' }
      },
      {
        path: 'adaptation',
        component: () => import('@/views/news'),
        name: 'Adaptation',
        meta: { title: '兼容适配', icon: 'el-icon-s-platform' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    name: 'About',
    redirect: 'noRedirect',
    meta: { title: '关于我们', icon: 'el-icon-s-tools' },
    children: [
      {
        path: '',
        component: () => import('@/views/news')
      }
    ]
  },
  {
    path: '/upload_manage',
    component: Layout,
    name: 'UploadManageLayout',
    meta: { title: '上传管理' },
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/upload'),
        name: 'UploadManage',
        meta: { title: '上传管理' },
        redirect: 'knowledge',
        children: [
          {
            path: 'knowledge',
            component: () => import('@/views/upload/knowledge/List'),
            meta: { title: '知识库' }
          },
          {
            path: 'knowledge/upload',
            component: () => import('@/views/upload/knowledge/Upload'),
            hidden: true,
            meta: { title: '知识上传', activeMenu: '/upload_manage/knowledge' }
          },
          {
            path: 'knowledge/:id/update',
            component: () => import('@/views/upload/knowledge/Upload'),
            hidden: true,
            meta: { title: '知识修改', activeMenu: '/upload_manage/knowledge' }
          },
          {
            path: 'driver',
            component: () => import('@/views/upload/driver/List'),
            meta: { title: '驱动' }
          },
          {
            path: 'driver/upload',
            component: () => import('@/views/upload/driver/Upload'),
            hidden: true,
            meta: { title: '驱动上传', activeMenu: '/upload_manage/driver' }
          },
          {
            path: 'video',
            component: () => import('@/views/upload/video/List'),
            meta: { title: '视频' }
          },
          {
            path: 'video/upload',
            component: () => import('@/views/upload/video/Upload'),
            hidden: true,
            meta: { title: '视频上传', activeMenu: '/upload_manage/video' }
          }
        ]
      }
    ]
  },
  {
    path: '/workorder',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':id/details',
        component: () => import('@/views/workorder/index'),
        hidden: true,
        meta: { title: '工单详情' }
      },
      {
        path: 'list',
        component: () => import('@/views/workorder/workOrderList'),
        hidden: true,
        meta: { title: '工单列表' }
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':id/details',
        component: () => import('@/views/question/index'),
        hidden: true,
        meta: { title: '问题详情' }
      },
      {
        path: 'list',
        component: () => import('@/views/question/questionList'),
        hidden: true,
        meta: { title: '问题列表' }
      },
      {
        path: 'feedback',
        component: () => import('@/views/question/feedback'),
        hidden: true,
        meta: { title: '问题反馈' }
      }
    ]
  },
  {
    path: '/index',
    component: () => import('@/views/home'),
    hidden: true
  }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
