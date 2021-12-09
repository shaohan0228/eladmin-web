<template>
  <div class="konw">
    <div class="banner">
      <div class="konw-tit">知识查询</div>
      <div class="know-search clearfix">
        <el-input v-model="querykey" placeholder="请输入内容" class="pull-left" style="width:544px;" />
        <el-button class="redbtn pull-left" icon="el-icon-search" style="border-top-left-radius: 0;border-bottom-left-radius: 0;" @click="goKnowSearch(querykey)" />
        <div class="hotsearch">
          <span>热搜词：</span>
          <span v-for="item in hotKeyList" :key="item" class="mright10" style="cursor: pointer;" @click="goKnowSearch(item)">{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="konw-con">
      <div class="w1200 clearfix">
        <el-tabs v-model="activeName">
          <el-tab-pane label="常见问题" name="first" @click="getKnowListByKnowType(1)">
            <div class="problemlist clearfix">
              <div v-for="(kItem,i) in knowList" :key="kItem" :class="i %3 == 2 ? 'problemlist-item mtop20' :'problemlist-item mright20 mtop20'">
                <div class="problemlist-tit clearfix">
                  <span class="fsize16 g333 pull-left">{{ kItem.knowName }}</span>
                  <router-link class="more" :to="'/resources/knowledge/'+kItem.knowId+'/list'">更多</router-link>
                </div>
                <ul class="problemlist-con">
                  <li v-for="pItem in kItem.problemlist" :key="pItem" @click="goKnowDetail(pItem.problemId,kItem.knowId)">{{ pItem.problemTitle }}</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热门问题" name="second" @click="getKnowListByKnowType(2)">
            <div class="problemlist clearfix">
              <div v-for="(kItem,i) in knowList" :key="kItem" :class="i %3 == 2 ? 'problemlist-item mtop20' :'problemlist-item mright20 mtop20'">
                <div class="problemlist-tit clearfix">
                  <span class="fsize16 g333 pull-left">{{ kItem.knowName }}</span>
                  <router-link class="more" :to="'/resources/knowledge/'+kItem.knowId+'/list'">更多</router-link>
                </div>
                <ul class="problemlist-con">
                  <li v-for="pItem in kItem.problemlist" :key="pItem" @click="goKnowDetail(pItem.problemId,kItem.knowId)">{{ pItem.problemTitle }}</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import { getHotKeyList, getKnowListByKnowType } from '../../api/upload/knowledge'
export default {
  components: { Footer },
  data() {
    return {
      querykey: '',
      activeName: 'first',
      hotKeyList: ['芯片品牌', 'AMD', '鲲鹏'],
      knowList: [
        { knowName: '厂商问题',
          knowAttr: 'first',
          knowId: 1,
          problemlist: [
            { problemId: 1, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 2, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 3, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 4, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 5, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' }
          ] },
        { knowName: '厂商问题',
          knowAttr: 'first',
          knowId: 2,
          problemlist: [
            { problemId: 1, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 2, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 3, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 4, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 5, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' }
          ] },
        { knowName: '厂商问题',
          knowAttr: 'first',
          knowId: 3,
          problemlist: [
            { problemId: 1, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 2, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 3, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 4, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 5, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' }
          ] },
        { knowName: '厂商问题',
          knowAttr: 'first',
          knowId: 4,
          problemlist: [
            { problemId: 1, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 2, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 3, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 4, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' },
            { problemId: 5, problemTitle: '热门问题TOP10热门问题TOP10热门问题TOP10' }
          ] }
      ]
    }
  },
  async mounted() {
    /* this.getHotKeyList()
   this.getKnowListByKnowType(1)*/
  },
  methods: {
    // 获取热搜词
    getHotKeyList() {
      this.hotKeyList = getHotKeyList()
    },
    getKnowListByKnowType(knowId) {
      switch (knowId) {
        case 1: {
          this.activeName = 'first'
          break
        }
        case 2: {
          this.activeName = 'second'
          break
        }
        default: {
          knowId = 1
          this.activeName = 'first'
        }
      }
      this.knowList = getKnowListByKnowType(knowId)
    },
    // 跳转搜索列表
    goKnowSearch(key) {
      if (key == null || key.length <= 0) {
        alert('请输入关键词或点击热搜词')
      }
      this.$router.push({
        path: '/resources/knowledgeSearch',
        query: {
          key: key
        }
      })
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
  .banner{background: url(../../assets/images/know1.png);background-repeat: no-repeat;background-position: top center;height:400px;}
  .konw-tit{font-size:24px;color: #fff;text-align: center;padding-top:120px;}
  .konw-con{background: #fff;padding:20px 20px 40px;margin-top:20px;margin-bottom: 40px;}
  .problem-tit{font-size: 24px;color: #333;padding: 30px;text-align: left;}
  .know-search{text-align: center;width:600px;margin: 20px auto;}
  .know-search .el-input__inner{border-top-right-radius: 0;border-bottom-right-radius: 0;}
  .hotsearch{font-size: 14px;color: #fff;margin-top: 20px;float: left;}
  .mright10{margin-right: 10px;}
  .el-tabs__active-bar{background-color: #ca1824;}
  .problemlist-item{padding: 30px;border:1px solid #ddd;width: 386.666px;float: left;box-sizing: border-box;}
  .more{display: inline-block;float: right;}
  .problemlist-con{margin-top:26px;}
  .problemlist-con li{font-size: 14px;color: #666;margin-top: 10px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
  .problemlist-con li:hover{color: #ca1824;cursor: pointer;}
</style>
