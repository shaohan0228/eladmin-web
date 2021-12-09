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
                <el-breadcrumb-item v-html="title">信创知识</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="mtop20">
                <div class="knowdetail-tit" v-html="title">信创知识</div>
                <div class="mtop10 fsize12 g666">
                  <span v-html="date">更新时间：2021-10-10</span>
                  <span v-html="readNumber">阅读量:3500</span>
                </div>
                <div class="txt-con mtop30" v-html="contents" />
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      type: 0,
      title: '信创知识详情',
      date: '更新时间：2021-11-19 11:27:06',
      readNumber: '阅读量:3005',
      contents: '<img src="../../../static/img/loginbg.c6d0e494.png" alt="">' +
        ' <p class="fsize16 g666 mtop20">12月7日下午，市委理论学习中心组召开（扩大）学习会议，深入学习贯彻党的十九届六中全会精神。市委书记胡涛主持会议并讲话。市长周鹏举、市人大常委会主任付志宏、市政协主席张盈围绕学习贯彻党的十九届六中全会精神作交流发言。</p>' +
        ' <p class="fsize16 g666 mtop20">会议指出，党的十九届六中全会是在中国共产党成立一百周年的重要历史时刻，在党领导人民实现第一个百年奋斗目标、向着第二个百年奋斗目标迈进的重大历史关头，召开的一次具有重大历史意义的会议。全会通过的《中共中央关于党的百年奋斗重大成就和历史经验的决议》是一篇光辉的马克思主义纲领性文献，是新时代中国共产党人牢记初心使命、坚持和发展中国特色社会主义的政治宣言，是以史为鉴、开创未来、实现中华民族伟大复兴的行动指南。全市各级党组织和广大党员干部要深刻领会党的十九届六中全会的重大意义，深刻理解《决议》的历史把握和深远考量，准确把握党的历史发展主题主线、主流本质，更加自觉地统一思想、统一意志、统一行动，强化历史自觉，践行初心使命，在实现中华民族伟大复兴进程中，跑好我们这代人的这一棒。</p>' +
        ' <p class="fsize16 g666 mtop20">会议强调，要进一步加深对“两个确立”的决定性意义，党的百年奋斗的伟大成就，党的百年奋斗形成的理论创新成果，党的百年奋斗的历史经验，以史为鉴、开创未来的重要要求等方面内容的领会把握，进一步增强“四个意识”、坚定“四个自信”、做到“两个维护”，不断从党的奋斗历程中汲取智慧和力量，以更加昂扬的姿态走好新时代阜新转型之路，奋力谱写实现中华民族伟大复兴中国梦的阜新篇章。</p>'
    }
  },
  created() {
    const { params } = this.$route
    this.id = params.id
    this.type = params.type
  },
  methods: {
    getDetails() {
      console.log(this.id)
    },
    getQueryKnowledgeList(type) {
      this.$router.push('/knowledge/' + type + '/list')
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
</style>
