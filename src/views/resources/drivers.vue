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
                <!-- <el-button type="text" class="g333"  >{{item.firmName}}</el-button>-->
                <el-radio-group v-model="query.contents.firmValue">
                  <el-radio-button v-for="item in firmList" :key="item.firmValue" v-model="firmList" class="g333" :label="item.firmName" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="分类：" class="mbottom0">
                <el-checkbox-group v-model="query.contents.checkName">
                  <el-checkbox v-for="(item,i) in checklist" :key="i" v-model="checklist" :label="item.checkName">{{ item.checkName }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div class="drive-search">
              <el-input v-model="query.contents.queryValue" class="w600" placeholder="请输入内容" />
              <el-button class="redbtn" @click.native.prevent="handleDriverForm">搜索</el-button>
            </div>
          </div>
          <div class="drive-list mtop20">
            <div class="drive-list-con">
              <div v-for="(item,i) in tableData.contents" :key="i" class="drive-list-item clearfix">
                <div class="drive-list-item-left">
                  <img :src="item.imgpath" width="52" alt="">
                  <div class="fsize12 g1e7bf4">{{ item.driverSize }}</div>
                </div>
                <div class="drive-list-item-right">
                  <div class="drive-list-tit">{{ item.driverTitle }}</div>
                  <div class="drive-list-txt mtop10">{{ item.driverRemark }}</div>
                  <div class="drive-list-tip text-right mtop20 g999">
                    <span class="mright15">{{ item.num }}人下载</span><span>{{ item.author }}</span>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
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
              <el-table-column prop="index" label="排名" width="50" />
              <el-table-column prop="tit" label="标题" width="210" />
              <el-table-column prop="number" label="下载次数" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ResourcesBanner from '@/components/ResourcesBanner'
import driverPath from '../../assets/images/drive2.png'
import { getUploadDriverListByQuery, getCheckList, getKownrankingList, getFirmList } from '../../api/upload/driver'
export default {
  components: { ResourcesBanner },
  data() {
    return {
      query: {
        contents: {
          firmName: '',
          queryValue: undefined,
          checkName: []
        },
        page: 0,
        size: 10,
        total: 0
      },
      driverPath: driverPath,
      tableData: {
        total: 0,
        size: 10,
        page: 0,
        contents: [
          {
            imgpath: driverPath,
            driverSize: '56.53MB',
            driverTitle: 'Intel驱动下载Intel驱动下载Intel',
            driverRemark: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载载Intel驱动下Intel驱动下载Intel驱动',
            num: 350,
            author: '河南省信创综合服务保障中心'
          },
          {
            imgpath: driverPath,
            driverSize: '5MB',
            driverTitle: 'Intel驱动下载Intel驱动下载Intel驱动下载ntel驱动下载ntel驱动下载',
            driverRemark: 'Intel驱动下载Intel驱动下载Intel驱动Intel驱动',
            num: 30,
            author: '河南省信创综合服务保障中心'
          },
          {
            imgpath: driverPath,
            driverSize: '6MB',
            driverTitle: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载ntel驱动下载ntel驱动下载',
            driverRemark: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下',
            num: 40,
            author: '河南省信创综合服务保障中心'
          },
          {
            imgpath: driverPath,
            driverSize: '0.53MB',
            driverTitle: 'Intel驱动下载Intel驱动下载IndfhssSfgs双方各el驱动下载Intel驱动下载ntel驱动下载ntel驱动下载',
            driverRemark: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载载Intel驱',
            num: 38,
            author: '河南省信创综合服务保障中心'
          }
        ]
      },
      checklist: [
        { checkName: 'CPU', checkValue: '1' },
        { checkName: '内存', checkValue: '2' }
      ],
      downrankingList: [{
        index: '1',
        tit: '《大数据工程师必读手册工程师必读 手册》',
        number: '89999'
      }, {
        index: '2',
        tit: '《大数据工程师必读手册》',
        number: '89999'
      }, {
        index: '3',
        tit: '《大数据工程师必读手册》',
        number: '89999'
      }, {
        index: '4',
        tit: '《大数据工程师必读手册》',
        number: '89999'
      }, {
        index: '5',
        tit: '《大数据工程师必读手册》',
        number: '89999'
      }],
      firmList: [
        { firmName: '鲲鹏', firmValue: '1' },
        { firmName: '龙芯MIPS', firmValue: '2' }
      ]
    }
  },
  async mounted() {
    /* this.getFirmList()
    this.getKownrankingList()
    await this.getCheckList()
    await this.fetchTableData()*/
  },
  methods: {
    // 获取厂商列表
    getFirmList() {
      this.checklist = getFirmList()
    },
    // 根据厂商获取分类
    getCheckList() {
      this.checklist = getCheckList(this.query.contents.firmValue)
    },
    // 下载排行
    getKownrankingList() {
      this.downrankingList = getKownrankingList()
    },
    // 获取表格数据
    async handleDriverForm() {
      const result = await getUploadDriverListByQuery(this.query)
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
      this.handleDriverForm()
    },
    // 处理页码跳转
    handleCurrentChange(val) {
      this.query.page = val - 1
      this.handleDriverForm()
    }
  }
}
</script>
<style scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .drive{background: #f8f8f8;}
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
</style>
