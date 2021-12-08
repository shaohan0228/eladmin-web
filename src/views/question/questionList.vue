<template>
  <el-container class="workorder">
    <el-aside width="160px" class="workorder-menu">
      <div class="menu-tit">问题管理</div>
      <div>
        <el-menu>
          <router-link to="/question/list">
            <el-menu-item index="1">
              <span slot="title">问题列表</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="workorder-main">
      <div class="main-con">
        <div class="main-tit">问题管理</div>
        <div class="padd20">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部问题" name="first">
              <div class="tab-con">
                <div class="table-top">
                  <el-input
                    v-model="query.blurry"
                    placeholder="请输入搜索的标题和内容"
                    style="width:200px;"
                    @keyup.enter.native="fetchTableData"
                  />
                  <el-button class="redbtn" icon="el-icon-search" @click="fetchTableData">搜索</el-button>
                </div>
                <el-table
                  ref="tableRef"
                  v-loading="loading"
                  :data="tableData.contents"
                  highlight-current-row
                  style="width: 100%"
                  class="mt-6"
                >
                  <el-table-column prop="number" label="问题编号" />
                  <el-table-column prop="title" label="问题标题" />
                  <el-table-column prop="state" label="状态">
                    <template v-slot:default="scope">
                      <el-tag v-if="scope.row.state == 1" type="warning">待受理</el-tag>
                      <el-tag v-else-if="scope.row.state == 2" type="warning">处理中</el-tag>
                      <el-tag v-else-if="scope.row.state == 3" type="success">已处理</el-tag>
                      <el-tag v-else type="warning">未知</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="receiveTime" label="接收时间" />
                  <el-table-column prop="finishTime" label="结束时间" />
                  <el-table-column prop="operation" label="操作">
                    <template v-slot:default="scope">
                      <el-button type="text" size="small" @click="toDetails(scope.row)">详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
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
              </div>
            </el-tab-pane>
            <el-tab-pane label="待受理" name="second">待受理</el-tab-pane>
            <el-tab-pane label="已处理" name="third">已处理</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getWorkOrderList } from '@/api/work/work'
export default {
  data() {
    return {
      // 存储一些默认数据
      default: {
        // 表格查询参数
        query: {}
      },
      activeName: 'first',
      searchToggle: true,
      loading: false, // 控制加载中状态显示
      tableData: {
        total: 0,
        size: 10,
        page: 0,
        contents: [
          {
            id: '1',
            number: '202112050206',
            title: '麒麟驱动的安装与下载',
            receiveTime: '2021-12-05',
            finishTime: '2021-12-05',
            state: 3
          },
          {
            id: '2',
            number: '202112050206',
            title: '麒麟驱动的安装与下载',
            receiveTime: '2021-12-05',
            finishTime: '2021-12-06',
            state: 3
          },
          {
            id: '3',
            number: '202112050206',
            title: '麒麟驱动的安装与下载',
            receiveTime: '2021-12-06',
            finishTime: '2021-12-06',
            state: 2
          },
          {
            id: '4',
            number: '202112050206',
            title: '如何解决工单异常问题呢',
            receiveTime: '2021-12-06',
            finishTime: '2021-12-07',
            state: 1
          }
        ]
      },
      query: {
        blurry: '',
        paused: undefined,
        type: undefined,
        createdTime: [],
        page: 0,
        size: 10,
        sort: 'id,desc'
      }
    }
  },
  async mounted() {
    this.initDefaultValues()
    await this.fetchTableData()
  },
  methods: {
    // 初始化默认值
    initDefaultValues() {
      this.default.query = JSON.parse(JSON.stringify(this.query))
    },
    // 刷新表格
    async refreshTasks() {
      this.loading = true
      try {
        await this.fetchTableData()
      } finally {
        this.loading = false
      }
    },
    // 获取表格数据
    async fetchTableData() {
      console.log('query')
      const result = await getWorkOrderList(this.query)
      const { page, total, size, contents } = result.data
      for (let i = 0; i < contents.length; i++) {
        const _item = contents[i]
        _item.nodes = []
        _item.params = undefined
        _item.customParams = undefined
        _item.expandLoading = false
      }
      this.tableData = { page: page + 1, total, size, contents }
    },
    // 处理页面pagesize变化
    handleSizeChange(val) {
      this.query.size = val
      this.fetchTableData()
    },
    // 处理页码跳转
    handleCurrentChange(val) {
      this.query.page = val - 1
      this.fetchTableData()
    },
    // 问题详情
    toDetails(rowData) {
      this.$router.push(`/question/${rowData.id}/details`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .el-container{width: 100%;min-height: calc(100vh - 60px);}
  .workorder-h{background: #ffffff;box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.10);width: 100%;height: 60px;z-index: 10;position: relative;}
  .logo1{margin: 10px;}
  .logo2{margin: 18px 0;}
  .header-right{float: right;line-height:30px;margin-top: 15px;}
  .header-link li{float: left;font-size: 14px;color: #333;}
  .workorder-menu{background: #fff;box-shadow: 0px 0px 3px 1px rgb(0 0 0 / 10%);}
  .workorder-main{padding: 20px;}
  .workorder .header-link li{cursor: pointer;margin-right: 40px;}
  .el-dropdown{cursor: pointer;}
  .menu-tit{height: 60px;line-height: 60px;padding-left:20px;border-bottom: 1px solid #ddd;font-size: 14px;color: #333;}
  .el-menu{border: 0;}
  .el-submenu .el-menu-item{width: 160px;min-width: 160px;}
  .el-menu-item{font-size: 12px;line-height: 48px;}
  .el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover,.el-submenu__title:focus{background-color: #ffeff0;}
  .el-menu-item.is-active{color: #ca1824;}
  .main-con{background: #fff;padding-bottom: 20px;}
  .main-tit{font-size: 16px;color: #333;padding: 0 20px;line-height: 76px;height: 78px;border-bottom: 1px solid #ddd;}
  .problem-tit{font-size: 18px;font-weight: bold;}
  .problem-fl span{float: left;border:1px solid #ddd;padding:4px 8px;font-size:12px;margin-right: 10px;margin-top: 15px;}
  .problem-ms{font-size: 14px;color: #333;}
  .problem-infor{font-size: 12px;color: #666;}
  .problem-infor span{display: inline-block;margin-right: 30px;}
  .gdtimelinezt{border-radius: 20px;padding:6px 16px;color: rgba(255, 255, 255, 0.9);font-size: 12px;margin-left:10px;}
  .redbtn{background-color: #ca1824;border-color: #ca1824;color: #fff;}
  .redbtn:hover,.redbtn:active,.redbtn:focus{background-color: #ca1824;border-color: #ca1824;color: #fff;opacity: 0.8;}
</style>
