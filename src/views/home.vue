<template>
  <div class="home">
    <div class="home-h">
      <div class="logo">
        <img src="../assets/images/logo4.png" height="92" alt="">
      </div>
      <div class="home-h-right ">
        <el-button v-if="!isLogin" class="common-btn ydloginbtn" round icon="el-icon-user-solid" @click="toLogin">登录</el-button>
        <!--        <el-button class="common-btn ydregbtn" type="primary" round el-icon-edit>注册</el-button>-->
        <el-dropdown v-if="isLogin">
          <span class="el-dropdown-link">
            18323562356<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/center">
              <el-dropdown-item>账号信息</el-dropdown-item>
            </router-link>
            <router-link to="/messages">
              <el-dropdown-item>消息中心</el-dropdown-item>
            </router-link>
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
    </div>
    <div class="home-con ptop190">
      <div class="w1360">
        <ul class="home-nav clearfix">
          <li class="mright40">
            <div class="before"><div style="margin-top:145px;">运维平台</div></div>
            <div class="after">
              <ul class="home-yw">
                <router-link to="resources/knowledge">
                  <li><i class="el-icon-search mright10" />知识查询</li>
                </router-link>
                <router-link to="resources/videos">
                  <li><i class="el-icon-video-play mright10" />视频学习</li>
                </router-link>
                <router-link to="resources/drivers">
                  <li><i class="el-icon-download mright10" />驱动下载</li>
                </router-link>
              </ul>
            </div>
          </li>
          <li class="mright40">
            <div class="before"><div style="margin-top:145px;">微信公众号</div></div>
            <div class="after">
              <div style="margin-top:40px;box-sizing: border-box;">
                <img style="margin-right:40px;" src="../assets/images/homecode.png" height="119" width="119" alt=""></div>
            </div>
          </li>
          <li class="mright40">
            <div class="before"><div style="margin-top:145px;">热线电话</div></div>
            <div class="after">
              <div style="color:#fff;margin-top: 76px;margin-right: 40px;">96596转1</div>
            </div>
          </li>
          <li>
            <div class="before"><div style="margin-top:145px;">信创助手</div></div>
            <div class="after">
              <div style="color:#fff;margin-top: 76px;margin-right: 40px;">开发中，敬请等待</div>
            </div>
          </li>
          <li class="mright40">
            <div style="margin-top:145px;">新闻中心</div>
          </li>
          <li class="mright40">
            <div style="margin-top:145px;">热度排行榜</div>
            <div class="after">
              <div style="color:#fff;margin-top: 76px;margin-right: 40px;">即将上线，敬请等待</div>
            </div>
          </li>
          <li class="mright40">
            <div class="before"><div style="margin-top:145px;">外设适配器查询</div></div>
            <div class="after">
              <ul class="home-yw" style="margin-top:30px;">
                <li>
                  <span>
                    <img class="pull-left" src="../assets/images/home-ql.png" height="30" width="50" alt="" style="margin:16px;">
                    <span class="pull-right" style="margin-top: -63px;">麒麟适配查询</span>
                  </span>
                </li>
                <li>
                  <span>
                    <img class="pull-left" src="../assets/images/home-tx.png" height="12" width="58" alt="" style="margin: 28px 12px 12px 12px;">
                    <span class="pull-right" style="margin-top: -52px;">统信适配查询</span>
                  </span>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <router-link to="question/feedback">
              <div style="margin-top:145px;">问题反馈</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '../utils/auth'

export default {
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
    toLogin() {
      this.$router.push({ path: '/login' })
    },
    toRegister() {
      this.$router.push({ path: '/register' })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      }).catch(() => {
        location.reload()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import url("https://unpkg.com/element-ui/lib/theme-chalk/index.css");
  @import "../assets/styles/common.css";
  .home-h{height:80px;width:100%;background: #fff;}
  .logo{display: inline-block;margin: 10px 0 10px 50px;}
  img, video {max-width: 65%;height: auto;}
  .el-dropdown{height: 40px;line-height: 40px;cursor: pointer;}
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{background-color: #ffe7e9;color: #ca1824;}
  .home-con{width: 100%;min-height: 1000px;background: url(../assets/images/indexbg.png);background-repeat: no-repeat;background-position: left center;background-size: 100% 100%;box-sizing: border-box;}
  .home-h-right{float: right;margin: 22px 50px;}
  .ydloginbtn{padding: 10px 30px!important;background: none;color: #ca1824;}
  .ydloginbtn:hover{background: #ffe7e9;color: #ca1824;}
  .ydregbtn{padding: 10px 30px!important;background: #ca1824;color: #fff;}
  .home-nav>li{position: relative;width: 310px;height: 200px;float: left;margin-bottom: 40px;font-size: 24px;color: #fff;text-align: center;border-radius: 11px;overflow: hidden;}
  .home-nav li .before{width:100%;height: 100%;position: absolute;top:0;left: 0;background-repeat: no-repeat;background-position: center center;backface-visibility:hidden;transition:3s;}
  .home-nav li .after{width:100%;height: 100%;position: absolute;top:0;left: 0;text-indent: 2em;transform:rotateY(-180deg);backface-visibility:hidden;transition:3s;background-position: center center;}
  .home-nav li:hover .before{transform:rotateY(180deg);}
  .home-nav li:hover .after{transform:rotateY(0deg);}
  .home-nav li:first-child .before{background-image: url(../assets/images/hone-nav1.png);}
  .home-nav li:nth-child(2) .before{background-image: url(../assets/images/hone-nav2.png);}
  .home-nav li:nth-child(3) .before{background-image: url(../assets/images/hone-nav3.png);}
  .home-nav li:nth-child(4) .before{background-image: url(../assets/images/hone-nav4.png);}
  .home-nav li:nth-child(5){background-image: url(../assets/images/hone-nav5.png);}
  .home-nav li:nth-child(6){background-image: url(../assets/images/hone-nav6.png);}
  .home-nav li:nth-child(7) .before{background-image: url(../assets/images/hone-nav7.png);}
  .home-nav li:nth-child(8){background-image: url(../assets/images/hone-nav8.png);}
  .home-nav li:first-child .after{background-image: url(../assets/images/hone-nav11.png);}
  .home-nav li:nth-child(2) .after{background-image: url(../assets/images/hone-nav22.png);}
  .home-nav li:nth-child(3) .after{background-image: url(../assets/images/hone-nav33.png);}
  .home-nav li:nth-child(4) .after{background-image: url(../assets/images/hone-nav44.png);}
  .home-nav li:nth-child(7) .after{background-image: url(../assets/images/hone-nav77.png);}
  .home-nav .home-yw li{height: 66px;line-height: 66px;color: #fff;text-align: center;font-size: 20px;margin-bottom: 0px;padding-right: 100px;box-sizing: border-box;border-radius: 0;}
  .home-nav .home-yw li:hover{background:rgba(255,255,255,0.5);}
</style>
