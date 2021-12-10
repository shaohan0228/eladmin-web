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
                <el-breadcrumb-item v-if="type === '1'">常用知识</el-breadcrumb-item>
                <el-breadcrumb-item v-else-if="type === '2'">热门查询</el-breadcrumb-item>
                <el-breadcrumb-item v-else>知识列表</el-breadcrumb-item>
              </el-breadcrumb>
              <ul class="detaillist mtop20">
                <li v-for="(item, index) in tableData.contents" :key="index">
                  <span class="dian" />
                  <span @click="getKnowledgeDetails(item.knowledge_id)" v-html="item.problem_description" />
                </li>
              </ul>
            </div>
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              class="text-right mt-6"
              :page-sizes="[10, 20, 30, 40]"
              :total="tableData.total"
              :page-size="tableData.size"
              :current-page="tableData.page"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { getKnowledgeList } from '@/api/knowledge/knowledge'

export default {
  data() {
    return {
      type: '0',
      title: '信创知识详情',
      tableData: {
        query: {
        },
        total: 0,
        size: 10,
        page: 1,
        contents: []
      }
    }
  },
  created() {
    const { params } = this.$route
    this.type = params.type || this.type
  },
  async mounted() {
    await this.fetchTableData()
  },
  methods: {
    // 获取表格数据
    async fetchTableData() {
      const result = await getKnowledgeList(this.tableData)
      const { page, total, size, contents } = result.data
      this.tableData = { page, total, size, contents }
    },
    // 处理页面pagesize变化
    handleSizeChange(val) {
      this.tableData.size = val
      this.fetchTableData()
    },
    // 处理页码跳转
    handleCurrentChange(val) {
      this.tableData.page = val + 1
      this.fetchTableData()
    },
    getQueryKnowledgeList(type) {
      this.$router.push('/resources/knowledge/' + type + '/list')
    },
    getKnowledgeDetails(id) {
      let type = this.type
      if (type === undefined) {
        type = '0'
      }
      this.$router.push('/resources/knowledge/' + id + '/details/' + type)
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
.detaillist li{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:1;overflow: hidden;font-size: 14px;color: #333;line-height: 40px;}
.detaillist li:hover{cursor: pointer;color:#ca1824;}
.dian{float: left;width: 6px;height: 6px;border-radius: 100px;display: inline-block;background: #000;margin:17px 10px 0 0;}
.detaillist li:hover .dian{background:#ca1824;}
</style>
