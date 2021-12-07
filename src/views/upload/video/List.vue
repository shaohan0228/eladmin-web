<template>
  <div class="main-con">
    <div class="main-tit">视频上传</div>
    <div class="main-content">
      <div class="table-top flex">
        <ita-button type="primary" class="mr-4" @click="toCreate">上传视频</ita-button>
        <div v-if="searchToggle">
          <el-input
            v-model="query.blurry"
            placeholder="请输入搜索的标题和内容"
            style="width:200px;"
            @keyup.enter.native="fetchTableData"
          />
          <ita-button icon="el-icon-search" type="primary">搜索</ita-button>
        </div>
      </div>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData.contents"
        highlight-current-row
        style="width: 100%"
        class="mt-6"
      >
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="content" label="内容简介" />
        <el-table-column prop="state" label="状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.state == 1" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.state == 2" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.state == 3" type="warning">未通过</el-tag>
            <el-tag v-else type="warning">未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="uploader" label="上传人" />
        <el-table-column prop="uploadTime" label="上传日期" />
        <el-table-column prop="operation" label="操作">
          <template v-slot:default="scope">
            <el-button type="text" size="small" @click="toModify(scope.row)">修改</el-button>
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
  </div>
</template>

<script>
import ItaButton from '@/components/ItaButton'
import { getUploadViedoList } from '@/api/upload/video'
export default {
  components: { ItaButton },
  data() {
    return {
      // 存储一些默认数据
      default: {
        // 表格查询参数
        query: {}
      },
      searchToggle: false,
      loading: false, // 控制加载中状态显示
      tableData: {
        total: 0,
        size: 10,
        page: 0,
        contents: [
          {
            id: '1',
            uploadTime: '2016-05-02',
            uploader: '王小虎',
            title: '麒麟驱动的安装与下载',
            content: '麒麟驱动的安装与下载麒麟驱动的安装与下载..'
          },
          {
            id: '2',
            uploadTime: '2016-05-04',
            uploader: '王小虎',
            title: '麒麟驱动的安装与下载',
            content: '麒麟驱动的安装与下载麒麟驱动的安装与下载..'
          },
          {
            id: '3',
            uploadTime: '2016-05-01',
            uploader: '王小虎',
            title: '麒麟驱动的安装与下载',
            content: '麒麟驱动的安装与下载麒麟驱动的安装与下载..'
          },
          {
            id: '4',
            uploadTime: '2016-05-03',
            uploader: '王小虎',
            title: '麒麟驱动的安装与下载',
            content: '普陀麒麟驱动的安装与下载麒麟驱动的安装与下载..区'
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
  created() {
  },
  async mounted() {
    this.initDefaultValues()
    await this.fetchTableDict()
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
    // 获取表格字典
    async fetchTableDict() {
      // const result = await getTaskDict()
      // this.taskDict = result.data
    },
    // 获取表格数据
    async fetchTableData() {
      const result = await getUploadViedoList(this.query)
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
    // 新增
    toCreate() {
      this.$router.push(`/upload_manage/video/upload`)
    },
    // 上传
    toModify(rowData) {
      console.log(`TRY TO MODIFY ${JSON.stringify(rowData)}`)
      this.$router.push(`/upload_manage/video/${rowData.id}/update`)
    }
  }
}
</script>
<style lang="scss" scoped>
.main-con {
  @apply bg-white;
  padding-bottom: 20px;

  .main-tit {
    font-size: 16px;
    color: #333;
    padding: 0 20px;
    line-height: 76px;
    height: 78px;
    border-bottom: 1px solid #ddd;
  }

  .main-content {
    padding: 20px;
  }
}
</style>
