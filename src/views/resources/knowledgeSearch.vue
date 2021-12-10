<template>
  <div class="konw">
    <div class="know-con">
      <div class="know-top">
        <el-form ref="query" label-width="80px">
          <el-form-item label="分类一：" class="mbottom10">
            <el-radio-group ref="check1" v-model="check1" @change="getKnowCheck2()">
              <el-radio-button v-for="item in checklist1" :key="item.knowledge_type_id" class="g333" :label="item.knowledge_type_id">{{ item.type_name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类二：" class="mbottom10">
            <el-radio-group v-model="check2" @change="getKnowCheck3()">
              <el-radio-button v-for="item in checklist2" :key="item.knowledge_type_id" class="g333" :label="item.knowledge_type_id">{{ item.type_name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类三：" class="mbottom0">
            <el-radio-group v-model="check3">
              <el-radio-button v-for="item in checklist3" :key="item.knowledge_type_id" class="g333" :label="item.knowledge_type_id">{{ item.type_name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="know-search mtop20">
        <el-input v-model="query.serchemes" class="w600" placeholder="请输入内容" />
        <el-button class="redbtn" @click="getKnowSearchList">搜索</el-button>
      </div>
      <div class="knowlist mtop40">
        <div class="knowlist">
          <div v-for="item in tableData.contents" :key="item.id" class="knowlist-item" @click="goKnowDetail(item.knowledge_id,0)">
            <div class="knowlist-item-tit">{{ item.problem_description }}</div>
            <div class="knowlist-item-txt">
              {{ item.problem_solution }}
            </div>
            <div class="knowlist-item-dec">
              来源： {{ item.source }}
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
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import { getHotKeyList, getKnowSearchList, getKnowCheck } from '../../api/upload/knowledge'
export default {
  components: { Footer },
  data() {
    return {
      checklist3: [],
      checklist2: [],
      checklist1: [],
      check3: '',
      check2: '',
      check1: '',
      query: {
        typeid: '',
        serchemes: '',
        showCount: 10,
        pageNum: 1
      },
      tableData: {
        total: 0,
        size: 10,
        page: 0,
        contents: []
      }
    }
  },
  async mounted() {
    this.getKnowCheck1()
    /* this.getHotKeyList()
   this.getKnowSearchList()*/
    this.getKnowSearchList()
  },
  methods: {
    // 获取分类一
    getKnowCheck1() {
      getKnowCheck(0).then(res => {
        console.log('res.code:' + res.code)
        if (res && res.code === 200) {
          this.checklist1 = res.data.contents
          if (this.checklist1 != null && this.checklist1[0] != null) {
            this.check1 = this.checklist1[0].knowledge_type_id
          }
          this.getKnowCheck2()
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 获取分类二
    getKnowCheck2() {
      getKnowCheck(this.check1).then(res => {
        if (res && res.code === 200) {
          this.checklist2 = res.data.contents
          if (this.checklist2 != null && this.checklist2[0] != null) {
            this.check2 = this.checklist2[0].knowledge_type_id
          }
          this.getKnowCheck3()
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 获取分类二
    getKnowCheck3() {
      getKnowCheck(this.check2).then(res => {
        if (res && res.code === 200) {
          this.checklist3 = res.data.contents
          if (this.checklist3 != null && this.checklist3[0] != null) {
            this.check3 = this.checklist3[0].knowledge_type_id
          }
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 获取热搜词
    getHotKeyList() {
      getHotKeyList().then(res => {
        if (res && res.code === 200) {
          this.hotKeyList = res.data.contents
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    getKnowSearchList() {
      this.query.typeid = this.check3 || this.check2 || this.check1
      getKnowSearchList(this.query).then(res => {
        if (res && res.code === 200) {
          const { page, total, size, contents } = res.data
          this.tableData = { page: page - 1, total, size, contents }
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
    },
    // 处理页面pagesize变化
    handleSizeChange(val) {
      this.query.showCount = val
      this.getKnowSearchList()
    },
    // 处理页码跳转
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getKnowSearchList()
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
