<template>
  <div class="flex flex-row flex-wrap align-middle">
    <div v-if="!isLogin">
      <ita-button>账号登录</ita-button>
      <ita-button type="primary">账号注册</ita-button>
    </div>
    <el-dropdown v-if="isLogin">
      <span class="el-dropdown-link">
        18323562356<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="user/center">
          <el-dropdown-item>账号信息</el-dropdown-item>
        </router-link>
        <router-link to="messages">
          <el-dropdown-item>消息中心</el-dropdown-item>
        </router-link>
        <router-link v-if="userRole === 'user'" to="question/list">
          <el-dropdown-item>问题管理</el-dropdown-item>
        </router-link>
        <router-link v-if="userRole === 'company'" to="question/list">
          <el-dropdown-item>工单管理</el-dropdown-item>
        </router-link>
        <router-link v-if="userRole === 'company'" to="question/list">
          <el-dropdown-item>上传中心</el-dropdown-item>
        </router-link>
        <span style="display:block;" @click="logout">
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </span>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import ItaButton from '@/components/ItaButton'

export default {
  name: 'HeaderBarUserInfo',
  components: { ItaButton },
  data() {
    return {
      isLogin: false,
      userRole: ''
    }
  },
  mounted() {
    this.isLogin = getToken() && true
  },
  methods: {
    getUserInfo() {

    },
    toLogin() {
      this.$router.push({ path: '/login' })
    },
    toRegister() {
      this.$router.push({ path: '/register' })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.href = '/'
      }).catch(() => {
        location.href = '/'
      })
    }
  }
}
</script>
