<template>
  <div class="video">
    <resources-banner>
      <template>
        视频学习
      </template>
    </resources-banner>
    <div class="video-con">
      <div class="w1200 clearfix">
        <div class="video-sx">
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
          <div class="video-search">
            <el-input v-model="query.contents.queryValue" class="w600" placeholder="请输入内容" />
            <el-button class="redbtn" @click.native.prevent="handleVideoForm">搜索</el-button>
          </div>
        </div>
        <div class="videolist">
          <div class="videolist-tit">编辑精选</div>
          <div class="videolist-con clearfix">
            <div v-for="(item,i) in tableData.contents" :key="i" :class="i %4 == 3 ? 'videolist-item' :'videolist-item mright20'" @click="goVideo(item.videoId)">
              <div class="videolist-video">
                <img :src="item.imgpath" alt="">
              </div>
              <div class="videolist-item-tit">{{ item.title }}</div>
              <div class="videolist-item-txt">{{ item.remark }}</div>
              <div class="videolist-item-bz clearfix">
                <span class="laiyuan">{{ item.author }}</span>
                <span class="videotime">{{ item.time }}</span>
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
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import ResourcesBanner from '@/components/ResourcesBanner'
import driverPath from '../../assets/images/loginbg.png'
import { getUploadDriverListByQuery, getCheckList, getFirmList } from '../../api/upload/video'
export default {
  components: { ResourcesBanner, Footer },
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
            videoId: 1,
            imgpath: driverPath,
            title: 'Intel驱动下载Intel驱动下载Intel',
            remark: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载载Intel驱动下Intel驱动下载Intel驱动',
            time: '2021-11-12',
            author: '河南省信创综合服务保障中心'
          },
          {
            videoId: 2,
            imgpath: driverPath,
            title: 'Intel驱动下载Intel驱动下载Intel',
            remark: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载载Intel驱动下Intel驱动下载Intel驱动',
            time: '2021-11-12',
            author: '河南省信创综合服务保障中心'
          },
          {
            videoId: 3,
            imgpath: driverPath,
            title: 'IntewerwerwWerwer23453晚上',
            remark: 'Intel驱动下载Intel驱动稍等发Intel驱动下载Intel驱动下载载Intel驱动下Intel驱动下载Intel驱动',
            time: '2021-11-12',
            author: '河南省信创综合服务保障中心'
          },
          {
            videoId: 4,
            imgpath: driverPath,
            title: 'Intel驱动下载I水电费tel',
            remark: 'Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载Intel驱动下载载Intel驱动下Intel驱动asfasfffffffffffffffffffffffffffffffff下载Intel驱动',
            time: '2021-11-12',
            author: '河南省信创综合服务保障中心'
          }
        ]
      },
      checklist: [
        { checkName: 'CPU', checkValue: '1' },
        { checkName: '内存', checkValue: '2' }
      ],
      firmList: [
        { firmName: '鲲鹏', firmValue: '1' },
        { firmName: '龙芯MIPS', firmValue: '2' }
      ]
    }
  },
  async mounted() {
    /* this.getFirmList()
    await this.getCheckList()
    await this.handleVideoForm()*/
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
    goVideo(videoId) {
      this.$router.push({
        path: '/resources/showVideo',
        query: {
          videoId: videoId
        }
      })
    },
    // 获取表格数据
    async handleVideoForm() {
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
      this.handleVideoForm()
    },
    // 处理页码跳转
    handleCurrentChange(val) {
      this.query.page = val - 1
      this.handleVideoForm()
    }
  }
}
</script>
<style scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .video{background: #f8f8f8;}
  .banner{background: url(../../assets/images/drive1.png);background-repeat: no-repeat;background-position: top center;}
  .video-tit{font-size: 46px;color: #fff;text-align: center;padding-top: 160px;}
  .video-con{padding: 40px 0;}
  .video-sx{background: #fff;padding: 20px 0;}
  .el-button--text{padding: 10px;}
  .el-button--text:active, .el-button--text:focus, .el-button--text:hover{border-color: #ca1824;background-color: #ca1824;color: #fff;}
  .video-search{padding: 10px 20px 10px 25px;}
  .videolist-tit{font-size: 24px;color: #333;margin: 30px 0;}
  .videolist-item{width: 285px;height:314px;float: left;background: #fff;box-shadow: 0 0 10px #e1e1e1;margin-bottom: 20px;}
  .videolist-item-tit{font-size: 14px;color: #333;padding:0 10px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;line-height: 30px;margin-top: 5px;}
  .videolist-item-txt{font-size: 12px;color: #999;padding: 0 10px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;margin-top: 5px;}
  .videolist-item-bz{font-size: 12px;color: #999;padding:15px 10px;border-top: 1px solid #ddd;margin-top: 20px;}
  .videotime{float: right;display: inline-block;}
  .laiyuan{display: inline-block;float: left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;width: 190px;}
  .videolist-video img{display: block;width: 100%;height: 164px;}
</style>
