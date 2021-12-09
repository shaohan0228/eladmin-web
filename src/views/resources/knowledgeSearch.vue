<template>
  <div class="konw">
    <div class="know-con">
      <div class="know-top">
        <el-form ref="query" label-width="80px">
          <el-form-item label="分类一：" class="mbottom10">
            <el-radio-group ref="check1" v-model="knowForm.query.check1">
              <el-radio-button v-for="item in checklist1" :key="item.value" class="g333" :label="item.value" @change="getKnowCheck2(item.value)">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类二：" class="mbottom10">
            <el-radio-group v-model="knowForm.query.check2">
              <el-radio-button v-for="item in checklist2" :key="item.value" class="g333" :label="item.value" @change="getKnowCheck3(item.value)">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类三：" class="mbottom0">
            <el-radio-group v-model="knowForm.query.check3">
              <el-radio-button v-for="item in checklist3" :key="item.value" class="g333" :label="item.value">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="know-search mtop20">
        <el-input v-model="knowForm.query.queryKey" class="w600" placeholder="请输入内容" />
        <el-button class="redbtn" @click="getKnowSearchList">搜索</el-button>
      </div>
      <div class="knowlist mtop40">
        <div class="knowlist">
          <div v-for="item in tableData.data" :key="item" class="knowlist-item" @click="goKnowDetail(item.problemId,item.knowId)">
            <div class="knowlist-item-tit">{{ item.title }}</div>
            <div class="knowlist-item-txt">
              {{ item.remark }}
            </div>
            <div class="knowlist-item-dec">
              来源： {{ item.source }}
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
        class="mtop30 mright30 text-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import { getHotKeyList, getKnowSearchList, getKnowCheck1, getKnowCheck2, getKnowCheck3 } from '../../api/upload/knowledge'
export default {
  components: { Footer },
  data() {
    return {
      checklist3: [{ name: 'CPU2', value: '1' }, { name: '网卡2', value: '2' }],
      checklist2: [{ name: 'CPU1', value: '1' }, { name: '网卡1', value: '2' }],
      checklist1: [{ name: 'CPU0', value: '1' }, { name: '网卡0', value: '2' }],
      knowForm: {
        query: {
          check3: '',
          check2: '',
          check1: '',
          queryKey: ''
        },
        total: 0,
        size: 10,
        page: 0
      },
      tableData: {
        total: 0,
        size: 10,
        page: 0,
        data: [
          { knowId: 1, problemId: 1, title: '接口调用说明', remark: '适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中', source: 'web开发 > URI API > 开发指南 > 接口调用说明' },
          { knowId: 1, problemId: 2, title: '接口调用说明', remark: '适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中', source: 'web开发 > URI API > 开发指南 > 接口调用说明' },
          { knowId: 1, problemId: 3, title: '接口调用说明', remark: '适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中', source: 'web开发 > URI API > 开发指南 > 接口调用说明' },
          { knowId: 1, problemId: 4, title: '接口调用说明', remark: '适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中适用于在手机端APP 和 手机浏览器中', source: 'web开发 > URI API > 开发指南 > 接口调用说明' }
        ]
      }
    }
  },
  /* directives: {
    trigger: {
      bind(el, binging) {
        console.log(el.value)
        el.value === 1 ? el.click() : null // 只点击第一个，id是在循环中手动添加的
        // $(el).trigger('click') // 所有都触发一次,然后就是最后一个
      }
    }
  },*/
  async mounted() {
    getKnowCheck1()
    /* this.getHotKeyList()
   this.getKnowSearchList()*/
  },
  methods: {
    // 获取分类一
    getKnowCheck1() {
      this.checklist1 = getKnowCheck1()
      if (this.checklist1 != null && this.knowForm.query.check1 == null) {
        this.knowForm.query.check1 = this.checklist1[0]
        // getKnowCheck2(this.knowForm.query.check1)
        this.$refs.check1.children[0].click()
      }
    },
    // 获取分类二
    getKnowCheck2(check1) {
      this.checklist2 = getKnowCheck2(check1)
      if (this.checklist2 != null) {
        this.knowForm.query.check2 = this.checklist2[0]
      }
    },
    // 获取分类二
    getKnowCheck3(check2) {
      this.checklist3 = getKnowCheck3(check2)
      if (this.checklist3 != null) {
        this.knowForm.query.check3 = this.checklist3[0]
      }
    },
    // 获取热搜词
    getHotKeyList() {
      this.hotKeyList = getHotKeyList()
    },
    getKnowSearchList() {
      const result = getKnowSearchList(this.knowForm)
      const { page, total, size, data } = result.data
      this.tableData = { page: page + 1, total, size, data }
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
    // 知识详情
    goKnowDetail(id, knowId) {
      this.$router.push({
        path: '/resources/knowledge/' + id + '/details/' + knowId
      })
    }
  }
}
</script>
<style scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .konw{background: #f8f8f8;}
  .know-con{padding: 40px;width: 1200px;min-width: 1200px;background: #fff;margin: 20px auto 40px;}
  .el-tabs__active-bar{background-color: #ca1824;}
  .knowlist-item{margin-top: 30px;cursor: pointer;}
  .knowlist-item-tit{color: #2f489c;font-size: 18px;}
  .knowlist-item-txt{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;font-size: 14px;color: #333;margin-top:20px;}
  .knowlist-item-dec{font-size: 14px;color: #999;margin-top:10px;}
</style>
