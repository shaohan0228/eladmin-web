<template>
  <div class="flex flex-row flex-wrap align-middle h-full items-center">
    <div v-if="!isLogin">
      <ita-button>账号登录</ita-button>
      <ita-button type="primary">账号注册</ita-button>
    </div>
    <div class="flex h-full items-center" style="font-size: 14px">
      <!--      <router-link to="/messages">-->
      <!--        <el-badge is-dot class="item mr-6">消息中心</el-badge>-->
      <!--      </router-link>-->
      <router-link to="/question/list">
        <el-badge class="item mr-6">问题管理</el-badge>
      </router-link>
      <router-link to="/workorder/list">
        <el-badge class="item mr-6">工单管理</el-badge>
      </router-link>
    </div>
    <el-dropdown v-if="isLogin">
      <span class="el-dropdown-link">
        {{ user.name }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <!--        <router-link to="/user/center">-->
        <!--          <el-dropdown-item>账号信息</el-dropdown-item>-->
        <!--        </router-link>-->
        <!--        <router-link to="/messages">-->
        <!--          <el-dropdown-item>消息中心</el-dropdown-item>-->
        <!--        </router-link>-->
        <router-link to="/question/list">
          <el-dropdown-item>问题管理</el-dropdown-item>
        </router-link>
        <router-link to="/workorder/list">
          <el-dropdown-item>工单管理</el-dropdown-item>
        </router-link>
        <router-link to="/upload_manage">
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
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderBarUserInfo',
  components: { ItaButton },
  data() {
    return {
      isLogin: false,
      userRole: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
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
<style scoped>
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus{background-color: #ffe7e9;color: #ca1824;}
a {
  color: black;
}
a:hover {
  color: black;
}
</style>

