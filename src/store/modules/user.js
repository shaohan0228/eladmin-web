import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.loginname, userInfo.password, null, null).then(res => {
          if (res && res.code === 200) {
            // 设置Token 30分钟过期
            setToken(res.data.token, true, new Date(new Date().getTime() + 30 * 60 * 1000))
            // 向vuex中写入token
            commit('SET_TOKEN', res.data.token)
            // 设置用户信息
            // setUserInfo(res.user, commit)
            // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
            // commit('SET_LOAD_MENUS', true)
            resolve()
          } else {
            reject(res.msg || '发生错误')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (res && res.code === 200) {
            setUserInfo(res.data, commit)
            resolve()
          } else {
            reject(res.msg || '发生错误')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          console.log(`logout success`)
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },

    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  commit('SET_USER', {})
  removeToken()
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (!res.roles || res.roles.length === 0) {
    commit('SET_ROLES', ['DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res)
}

export default user
