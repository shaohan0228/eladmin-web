<template>
  <div class="know">
    <div class="know-con">
      <el-container>
        <el-container>
          <el-aside width="160px" class="know-menu bacfff">
            <div class="menu-tit">知识查询</div>
            <div v-if="type === '1'">
              <el-menu class="mtop20">
                <el-menu-item class="is-active">
                  <span slot="title" @click="getQueryKnowledgeList(1)">常用知识</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span slot="title" @click="getQueryKnowledgeList(2)">热门查询</span>
                </el-menu-item>
              </el-menu>
            </div>
            <div v-else-if="type === '2'">
              <el-menu class="mtop20">
                <el-menu-item>
                  <span slot="title" @click="getQueryKnowledgeList(1)">常用知识</span>
                </el-menu-item>
                <el-menu-item class="is-active">
                  <span slot="title" @click="getQueryKnowledgeList(2)">热门查询</span>
                </el-menu-item>
              </el-menu>
            </div>
            <div v-else>
              <el-menu class="mtop20">
                <el-menu-item>
                  <span slot="title" @click="getQueryKnowledgeList(1)">常用知识</span>
                </el-menu-item>
                <el-menu-item>
                  <span slot="title" @click="getQueryKnowledgeList(2)">热门查询</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-aside>
          <el-main class="know-main">
            <div class="main-con padd20">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">文档中心</el-breadcrumb-item>
                <el-breadcrumb-item v-html="title">信创知识</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="mtop20">
                <div class="knowdetail-tit" v-html="title">信创知识</div>
                <div class="mtop10 fsize12 g666">
                  <span v-html="date">更新时间：2021-10-10</span>
                  <span v-html="readNumber">阅读量:3500</span>
                </div>
                <div class="txt-con mtop30" v-html="contents" />
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { getKnowledgeDetails } from '@/api/knowledge/knowledge'

export default {
  data() {
    return {
      id: null,
      type: 0,
      title: '内容详情',
      date: '更新时间：-- ',
      readNumber: '阅读量:0',
      contents: ''
    }
  },
  created() {
    const { params } = this.$route
    this.id = params.id
    this.type = params.type
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    async getDetails() {
      const result = await getKnowledgeDetails(this.id)
      if (result.code === 200) {
        this.readNumber = '阅读量:' + result.data.click_num
        this.title = result.data.problem_description
        this.date = '更新时间：' + result.data.update_time
        this.contents = result.data.problem_solution
      } else {
        this.contents = '<p class="fsize16 g666 mtop20">暂无数据，请刷新重试！</p><img src="../../../../static/img/loginbg.c6d0e494.png" alt="">'
      }
    },
    getQueryKnowledgeList(type) {
      this.$router.push('/resources/knowledge/' + type + '/list')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .know{background: #f8f8f8;}
  .el-container{width: 100%;min-height: 80%;min-height: 80vh;}
  .know-con{width: 1200px;min-width: 1200px;margin:20px auto 40px;background: #fff;}
  .menu-tit{font-size: 16px;color: #333;padding-left: 20px;}
  .know-menu{padding-top:30px;box-shadow: 0px 0px 10px #f2f2f2;}
  .el-menu{border: 0;}
  .el-submenu .el-menu-item{width: 160px;min-width: 160px;}
  .el-menu-item{font-size: 12px;line-height: 48px;}
  .el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover,.el-submenu__title:focus{background-color: #ffeff0;}
  .el-menu-item.is-active{color: #ca1824;}
  .knowdetail-tit{font-size: 24px;color: #333;font-weight: bold;}
  .txt-con img{max-width: 100%;}
</style>
