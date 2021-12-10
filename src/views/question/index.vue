<template>
  <el-container class="workorder">
    <el-aside width="160px" class="workorder-menu">
      <div class="menu-tit">问题管理</div>
      <div>
        <el-menu>
          <router-link to="/question/list">
            <el-menu-item index="1">
              <span slot="title" @click="questionList">问题列表</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="workorder-main">
      <div class="main-con">
        <div class="main-tit">问题详情</div>
        <div class="padd20">
          <div class="problem-tit" v-html="title">【厂商问题】如何解决工单异常问题</div>
          <div class="problem-fl clearfix">
            <span v-for="(item, index) in spanList" :key="index">{{ item }}</span>
          </div>
          <div class="g666 fsize12 mtop15" v-html="orderDate">2021-01-01 13:00:00</div>
          <div class="problem-tit mtop40">问题描述</div>
          <div class="problem-ms mtop15" v-html="orderDesc">描述内容信息</div>
          <div class="problem-tit mtop40">联系方式</div>
          <div class="problem-infor mtop15">
            <span v-html="user.name">联系人：张三</span>
            <span v-html="user.tel">联系方式：18623562356</span>
            <span v-html="user.company">单位名称：河南省信创综合服务保障中心</span>
            <span v-html="user.address">详细地址：河南省郑州市金水区企业联合大厦豫发中心</span>
          </div>
          <el-tabs v-model="activeName" type="card" class="mtop40" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in showData" :key="index" :label="item.orderNumber" :name="item.id">
              <div class="problem-tit mtop20">工单编号：20211120356</div>
              <div class="mtop20">
                <span class="fsize14 fw">工单描述：</span>
                <span>
                  近期，国外疫情持续处于高位，境外输入病例时有出现，国内疫情也呈多点散发状态，局部出现聚集性疫情。除内蒙古、黑龙江、河北等省市出现本地新冠疫情外，12月5日以来，我国浙江省宁波市、绍兴市、杭州市、江苏省南京市等地也陆续通报本土新冠肺炎病例，且境外发现新冠变异毒株，我省冬季疫情防控压力不断增大，防控形势严峻复杂。为持续做好我省“外防输入,内防反弹”工作, 有效控制和降低新冠疫情输入传播风险，确保广大人民群众健康安全，河南省疾控中心紧急提醒
                </span>
              </div>
              <div class="mtop40">
                <el-timeline class="mtop40">
                  <el-timeline-item v-for="(sub, subIndex) in showData" :key="subIndex" placement="top">
                    <el-card>
                      <h4>
                        <span v-html="sub.title">如何解决工单异常问题</span>
                        <span v-if="sub.status === 0" class="gdtimelinezt ba2F489C">已接单</span>
                        <span v-else-if="sub.status === 1" class="gdtimelinezt baFF8E3D">处理中</span>
                        <span v-else-if="sub.status === 2" class="gdtimelinezt ba67c23a">已完成</span>
                        <span v-else class="gdtimelinezt ca1824">待接单</span>
                      </h4>
                      <p>处理人：<span v-html="sub.name">刘某</span></p>
                      <p class="fsize12 g999" v-html="sub.date">2020-11-11 13:00:00</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      dialogFormVisible: false,
      activeName: '11',
      form: {
        desc: ''
      },
      formLabelWidth: '120px',
      title: '【厂商问题】如何解决工单异常问题呢',
      orderDate: '2021-12-06 14:05:56',
      orderDesc: '2021年12月06日河南省疫情防控办公室通知，当前疫情问题仍旧非常严峻，望广大人民群众不要心存侥幸心理，注意个人防护！' +
        '\n  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;近期，国外疫情持续处于高位，境外输入病例时有出现，国内疫情也呈多点散发状态，局部出现聚集性疫情。除内蒙古、黑龙江、河北等省市出现本地新冠疫情外，12月5日以来，我国浙江省宁波市、绍兴市、杭州市、江苏省南京市等地也陆续通报本土新冠肺炎病例，且境外发现新冠变异毒株，我省冬季疫情防控压力不断增大，防控形势严峻复杂。为持续做好我省“外防输入,内防反弹”工作, 有效控制和降低新冠疫情输入传播风险，确保广大人民群众健康安全，河南省疾控中心紧急提醒如下：\n' +
        '\n' +
        '一、及时主动报备行程\n' +
        '\n' +
        '（一）11月22日（含）以来，有浙江省宁波市旅居史的来（返）豫人员；\n' +
        '\n' +
        '11月23日（含）以来，有浙江省绍兴市旅居史的来（返）豫人员；\n' +
        '\n' +
        '12月2日（含）以来，有浙江省杭州市旅居史的来（返）豫人员；\n' +
        '\n' +
        '12月5日（含）以来，有江苏省南京市旅居史的来（返）豫人员。\n' +
        '\n' +
        '（二）有在对应日期搭乘以下交通工具且目前在豫的人员：\n' +
        '\n' +
        '11月22日G7506次高铁（从浙江宁波到上海虹桥）；\n' +
        '\n' +
        '11月22日G7535次高铁（从上海虹桥到浙江宁波）。\n' +
        '\n' +
        '（三）有国内其他中高风险地区旅居史、与已公布的阳性感染者活动轨迹有交集的人员。\n' +
        '\n' +
        '（四）发现自己健康码为红码、黄码人员。\n' +
        '\n' +
        '请上述人员第一时间主动向所在社区（村）、单位或住宿宾馆报备，按要求配合尽快落实隔离管控、核酸检测、健康监测等各项防控措施。\n' +
        '\n' +
        '二、非必要不前往中高风险地区\n' +
        '\n' +
        '随时关注国内新冠肺炎疫情变化情况，非必要不前往高、中风险地区以及发生本土疫情的地区。如确需前往的，请务必做好个人防护，关注目的地疫情风险提示。\n' +
        '\n' +
        '从外省旅游、出差返豫后，建议主动做一次核酸检测，并自我观察14天，做好健康监测。\n' +
        '\n' +
        '三、持续做好个人防护\n' +
        '\n' +
        '（一）个人防护不松懈，坚持戴口罩、勤洗手、常通风，咳嗽、打喷嚏时注意遮挡，做好家庭环境清洁和垃圾处理。\n' +
        '\n' +
        '（二）避免前往室内密闭场所，减少聚集，不扎堆。\n' +
        '\n' +
        '（三）到公共场所保持一米社交距离，主动配合测温、扫码等防疫措施。\n' +
        '\n' +
        '（四）购买冷链食品时要去正规超市或市场，戴好口罩和一次性手套，尽量避免用手直接接触；储存加工时，遵循“生熟分开”原则，接触后及时洗手。\n' +
        '\n' +
        '（五）查收来自境外及中高风险地区的快递、货物时，戴一次性手套，先用75%的酒精或含氯消毒液等擦拭消毒，但切勿大面积喷洒；拆完快递后洗手。\n' +
        '\n' +
        '四、积极开展自我健康监测\n' +
        '\n' +
        '做好日常自我健康监测，如出现发热、干咳、乏力、咽痛、嗅（味）觉减退等不适症状，切勿自行诊治，应立即前往就近的发热门诊就诊，并如实告知个人旅居史、接触史等流行病学史，并在就诊过程中做好佩戴口罩等个人防护措施，避免搭乘公共交通工具等。\n' +
        '\n' +
        '五、尽早完成新冠疫苗接种，第二针接种满6个月后积极打加强针\n' +
        '\n' +
        '接种新冠病毒疫苗是预防新冠肺炎最安全、最有效的手段，尤其对减少重症和死亡效果明显。全省正在重点推进3-11岁儿童接种、18岁以上人群加强免疫、60岁以上老年人的接种等工作，请符合条件的人群，特别是重点人群尽快完成接种，全程接种满6个月后积极接种加强针，以产生更高、更稳固的免疫效果，共筑全民免疫屏障。\n' +
        '\n' +
        '<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源：河南疾控<img class="mtop20" src="../../../../static/img/loginbg.c6d0e494.png" alt="" style="max-width:60%;">',
      spanList: [
        '鲲鹏硬盘',
        '鲲鹏驱动',
        '鲲鹏电商'
      ],
      user: {
        'name': '联系人：张三丫',
        'tel': '联系方式：18623562356',
        'company': '单位名称：河南省信创综合服务保障中心',
        'address': '详细地址：河南省郑州市金水区企业联合大厦豫发中心'
      },
      orderList: [
        {
          'id': '11',
          'orderNumber': '工单编号：20211120636',
          'title': '如何解决工单异常问题',
          'status': 0,
          'name': '刘一某',
          'date': '2021-12-06 14:05:56'
        },
        {
          'id': '22',
          'orderNumber': '工单编号：20211120736',
          'title': '如何解决工单异常问题',
          'status': 1,
          'name': '刘一某',
          'date': '2021-12-06 15:12:36'
        }
      ],
      showData: []
    }
  },
  created() {
    const { params } = this.$route
    this.id = params.id
  },
  mounted() {
    this.showData = JSON.parse(JSON.stringify(this.orderList))
  },
  methods: {
    receivingOrder() {
      console.log('接收工单' + this.id)
    },
    finishOrder() {
      console.log('结束工单' + this.id)
      this.dialogFormVisible = true
    },
    questionList() {
      this.$router.push({ path: '/question/list' })
    },
    getCurrentData(id) {
      console.log('id')
    },
    // tab切换
    handleClick(tab, event) {}
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
  .el-button--mini, .el-button--small {width: 100px;font-size: 14px;border-radius: 3px;margin-left: 20px;}
  .el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover,.el-submenu__title:focus{background-color: #ffeff0;}
  .el-menu-item.is-active{color: #ca1824;}
  .main-con{background: #fff;}
  .main-tit{font-size: 16px;color: #333;padding: 0 20px;line-height: 76px;height: 78px;border-bottom: 1px solid #ddd;}
  .problem-tit{font-size: 18px;font-weight: bold;}
  .problem-fl span{float: left;border:1px solid #969696;padding:4px 8px;font-size:12px;margin-right: 10px;margin-top: 15px;color: #969696;}
  .problem-ms{font-size: 14px;color: #333;}
  .problem-infor{font-size: 12px;color: #666;}
  .problem-infor span{display: inline-block;margin-right: 30px;}
  .gdtimelinezt{border-radius: 20px;padding:4px 17px;color: rgba(255, 255, 255, 0.9);font-size: 12px;margin-left:10px;width: 70px;height: 25px;}
  .redbtn{background-color: #ca1824;border-color: #ca1824;color: #fff;width: 90px;margin-left: 25px;}
  .redbtn:hover,.redbtn:active,.redbtn:focus{background-color: #ca1824;border-color: #ca1824;color: #fff;opacity: 0.8;}
  .redborderbtn{background-color: #fff;border-color: #ca1824;color: #ca1824;width: 90px;margin-left: 25px;}
  .redborderbtn:hover{background: #ffe7e9;color: #ca1824;}
</style>
