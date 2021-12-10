<template>
  <div class="main-con">
    <div class="main-tit">驱动列表</div>
    <div class="main-content">
      <div class="table-top flex">
        <ita-button type="primary" class="mr-4" @click="toCreate">上传驱动</ita-button>
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
        <el-table-column prop="name" label="标题" />
        <el-table-column prop="introduce" label="内容简介" />
        <el-table-column prop="state" label="状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.state == 0" type="warning">审核中</el-tag>
            <el-tag v-else-if="scope.row.state == 1" type="success">已通过</el-tag>
            <el-tag v-else-if="scope.row.state == 2" type="danger">弃用</el-tag>
            <el-tag v-else type="info">未知</el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="update_time" label="上传日期" />-->
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
import { getUploadDriverList } from '@/api/upload/driver'
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
        contents: []
      },
      query: {
        blurry: '',
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
      const result = await getUploadDriverList({ pageNum: this.query.page + 1, showCount: this.query.size })
      if (result && result.code === 200) {
        const { page, total, size, contents } = result.data
        this.tableData = { page: page, total, size, contents }
      }
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
      this.$router.push(`/upload_manage/driver/upload`)
    },
    // 上传
    toModify(rowData) {
      this.$router.push(`/upload_manage/driver/${rowData.drive_id}/update`)
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
