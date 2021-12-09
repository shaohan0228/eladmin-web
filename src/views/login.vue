<template>
  <div class="login">
    <div class="login-header">
      <img class="logo1 pull-left" src="../assets/images/logo1.png" height="40" width="40" alt="">
      <span class="fsize18 fw mtop15">河南省信创综合服务保障中心</span>
    </div>
    <div class="login-con">
      <div v-if="qrCodeLoginSupport" class="code" @click="show=false">
        <!-- 点击二#维码图，扫码页面显示，在此先隐藏 -->
        <a class="codebtn codeimg" href="" />
        <div class="saodiv">
          <div class="login-tit">用户登录</div>
          <!-- 点击下面这个电脑图，扫码这块隐藏 -->
          <a class="codebtn codeimgwin" href="" />
          <div class="clearfix mbottom30"><img
            style="margin:0 auto;display:block;"
            src="images/sao.png"
            height="180"
            width="180"
            alt=""
          ></div>
          <div class="clearfix text-center">
            <span class="clearfix d-inline">
              <img class="pull-left mright15" src="images/saosao.png" height="20" width="20" alt="">
              <span class="fsize14 g666 pull-left">打开微信扫一扫登录</span>
            </span>
          </div>
          <div class="saodiv-b">
            还没有账号？<a href="">立即注册</a>
          </div>
        </div>
      </div>
      <div class="login-tit">用户登录</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="loginname">
          <el-input v-model="form.loginname" placeholder="手机号码" @keyup.enter.native="login" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="登录密码" @keyup.enter.native="login" />
        </el-form-item>
        <!--        <div class="clearfix mbottom30">-->
        <!--          <a class="fsize14 pull-left" href="" @click="toRegister">注册账号</a>-->
        <!--          <a class="fsize14 pull-right" href="" @click="toForgetPwd">忘记密码</a>-->
        <!--        </div>-->
        <el-form-item>
          <el-button type="primary" class="common-btn login-btn" @click.native.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import qs from 'qs'

export default {
  name: 'Login',
  data: function() {
    return {
      qrCodeLoginSupport: false,
      visible: false,
      form: {
        loginname: 'afaff',
        password: '1'
      },
      rules: {
        loginname: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
          // { len: 8, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { min: 6, max: 20, message: '密码长度为6到20位', trigger: 'blur' }
        ]
      },
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const data = route.query
        if (data && data.redirect) {
          this.redirect = data.redirect
          delete data.redirect
          if (JSON.stringify(data) !== '{}') {
            this.redirect = this.redirect + '&' + qs.stringify(data, { indices: false })
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      // eslint-disable-next-line no-unused-vars
      const _this = this
      this.$refs.form.validate(async valid => {
        if (valid) {
          const params = {
            loginname: this.form.loginname,
            password: this.form.password
          }
          this.$store.dispatch('Login', params).then(() => {
            this.loading = false
            Notification.success('登录成功')
            this.$store.dispatch('GetInfo').then(() => {
              setTimeout((_this) => {
                this.$router.push({ path: this.redirect || '/' })
              }, 500)
            }).catch(() => {
              Notification.error('无法获取用户信息')
            })
          }).catch((error) => {
            Notification.error(error || '未知错误')
          })
        }
      })
    },
    toRegister() {
      this.$router.push({ path: '/register' })
    },
    toForgetPwd() {
      this.$router.push({ path: '/forget-pwd' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../assets/styles/common.css";

.login {
  width: 100%;
  min-height: 1020px;
  background-image: url(../assets/images/loginbg.png);
  background-position: top bottom;
  background-repeat: no-repeat;
}

.login-header {
  height: 60px;
  width: 100%;
  background: #fff;
}

.logo1 {
  margin: 10px 10px 10px 30px;
}

.logo2 {
  margin: 18px 0;
}

.login-con {
  width: 380px;
  height: 446px;
  margin: 200px auto 0;
  border-radius: 2px;
  background: #fff;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  margin-right: 330px;
}

.el-form-item__content {
  margin-left: 0 !important;
}

.login-tit {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.login-btn {
  width: 100%;
}

.codebtn {
  display: inline-block;
  position: absolute;
  top: 2px;
  right: 2px;
  width: 77px;
  height: 77px;
}

.codeimg {
  background: url(../assets/images/code.png);
  background-repeat: no-repeat;
}

.saodiv {
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 446px;
  z-index: 10;
  background: #fff;
  padding: 20px;
  z-index: 100;
  box-sizing: border-box;
  display: none;
}

.saodiv-b {
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-top: 48px;
}

.codeimgwin {
  background: url(../assets/images/pc.png);
  background-repeat: no-repeat;
}
</style>
