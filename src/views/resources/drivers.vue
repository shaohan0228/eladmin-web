<template>
  <div class="drive">
    <resources-banner>
      <template>
        驱动下载
      </template>
    </resources-banner>
    <div class="drive-con">
      <div class="w1200 clearfix">
        <div class="drive-left">
          <div class="drive-sx">
            <el-form ref="query" label-width="80px">
              <el-form-item label="厂商：" class="mbottom10">
                <el-radio-group v-model="query.company_id">
                  <el-radio-button v-for="item in firmList" :key="item.company_id" v-model="firmList" class="g333" :label="item.company_id" @change="checklist">{{ item.company_name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="分类：" class="mbottom0">
                <el-checkbox-group v-model="equipment_id_Array">
                  <el-checkbox v-for="(item) in checklist" :key="item.equipment_id" v-model="checklist" :label="item.equipment_id">{{ item.equipment_name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div class="drive-search">
              <el-input v-model="query.serchemes" class="w600" placeholder="请输入内容" />
              <el-button class="redbtn" @click.native.prevent="handleDriverForm">搜索</el-button>
            </div>
          </div>
          <div class="drive-list mtop20">
            <div class="drive-list-con">
              <div v-for="(item,i) in tableData.contents" :key="i" class="drive-list-item clearfix">
                <div class="drive-list-item-left">
                  <img :src="imgpath" width="52" alt="">
                  <div class="fsize12 g1e7bf4">{{ item.size }}</div>
                </div>
                <div class="drive-list-item-right">
                  <div class="drive-list-tit">{{ item.name }}</div>
                  <div class="drive-list-txt mtop10">{{ item.introduce }}</div>
                  <div class="drive-list-tip text-left mtop20 g999">
                    <span class="mright15">{{ item.amount }}人下载</span><span>{{ item.username }}</span>
                    <el-button type="text" class="downbtn pull-right" @click="dowmload(item.address,item.drive_id)">下载</el-button>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination
              :page-sizes="[10, 20, 30, 40]"
              :total="tableData.total"
              :page-size="tableData.size"
              :current-page="tableData.page"
              layout="total, sizes, prev, pager, next, jumper"
              class="mtop20 mright30 text-right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <div class="drive-right">
          <div class="downranking">
            <div class="fsize18 g333 mtop10">下载排行榜</div>
            <el-table :data="downrankingList" class="mtop20" style="width: 100%;">
              <el-table-column label="排名" width="50">
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="标题" width="150" />
              <el-table-column prop="amount" label="下载次数" />
              <el-table-column
                label="操作"
                width="60"
              >
                <template slot-scope="scope">
                  <el-button type="text" class="downbtn" @click="dowmload(scope.row.address,scope.row.drive_id)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import ResourcesBanner from '@/components/ResourcesBanner'
import driverPath from '../../assets/images/drive2.png'
import { getUploadDriverListByQuery, getCheckList, getKownrankingList, getFirmList, addDownloadCount } from '../../api/upload/driver'
export default {
  components: { ResourcesBanner, Footer },
  data() {
    return {
      query: {
        company_id: '',
        serchemes: '',
        equipment_id: '',
        pageNum: 1,
        showCount: 10
      },
      equipment_id_Array: [],
      driverMap: { driverID: 0 },
      driverPath: driverPath,
      imgpath: driverPath,
      tableData: {
        total: 0,
        size: 10,
        page: 1,
        contents: [
        ]
      },
      checklist: [],
      firmList: [],
      downrankingList: []
    }
  },
  async mounted() {
    this.getKownrankingList()
    this.getFirmList()
    await this.handleDriverForm()
  },
  methods: {
    // 获取厂商列表
    getFirmList() {
      getFirmList().then(res => {
        if (res && res.code === 200) {
          this.firmList = res.data.contents
          console.log('this.firmList[0]:' + this.firmList[0].company_id)
          this.query.company_id = this.firmList[0].company_id
          this.getCheckList()
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 根据厂商获取分类
    getCheckList() {
      getCheckList(this.query.company_id).then(res => {
        if (res && res.code === 200) {
          this.checklist = res.data.contents
          this.equipment_id_Array = [this.checklist[0].equipment_id]
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 下载排行
    getKownrankingList() {
      getKownrankingList().then(res => {
        if (res && res.code === 200) {
          this.downrankingList = res.data.contents
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 获取表格数据
    async handleDriverForm() {
      this.query.equipment_id = this.equipment_id_Array.join(',')
      getUploadDriverListByQuery(this.query).then(res => {
        if (res && res.code === 200) {
          const { page, total, size, contents } = res.data
          this.tableData = { page: page + 1, total, size, contents }
          console.log('tableData:' + this.tableData.contents)
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 处理页面pagesize变化
    handleSizeChange(val) {
      this.query.size = val
      this.handleDriverForm()
    },
    // 处理页码跳转
    handleCurrentChange(val) {
      this.query.page = val - 1
      this.handleDriverForm()
    },
    dowmload(linkPath, id) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = linkPath
      link.click()
      addDownloadCount(id)
    }
  }
}
</script>
<style scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .drive{background: #f8f8f8;}
  .banner{background: url(../../assets/images/drive1.png);background-repeat: no-repeat;background-position: top center;}
  .drive-tit{font-size: 46px;color: #fff;text-align: center;padding-top: 160px;}
  .drive-con{padding: 40px 0;}
  .drive-left{float: left;width: 794px;}
  .drive-right{float: right;width: 387px;}
  .drive-sx{background: #fff;padding: 10px 0;}
  .el-button--text{padding: 10px;}
  .el-button--text:active, .el-button--text:focus, .el-button--text:hover{border-color: #ca1824;background-color: #ca1824;color: #fff;}
  .drive-list{padding-bottom: 40px;background: #fff;}
  .drive-search{padding: 20px;}
  .drive-list-con{padding:0 30px 10px;}
  .drive-list-item{padding: 38px 0 20px;border-bottom: 1px solid #ddd;}
  .drive-list-item-left{display: inline-block;width:100px;padding-left: 5px;float: left;}
  .drive-list-item-right{float: left;width:629px;}
  .drive-list-tit{font-size: 18px;color: #333;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
  .drive-list-txt{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 12px;color: #666;line-height: 22px;}
  .downranking{background: #fff;padding: 20px;}
  .el-table th.el-table__cell{background: rgba(30,123,244,0.06);color: #2f489c;}
  .downbtn{padding:5px;}
  .downbtn.el-button--text:active, .downbtn.el-button--text:focus, .downbtn.el-button--text:hover{border:0;background:none;color: #ca1824;}
</style>
