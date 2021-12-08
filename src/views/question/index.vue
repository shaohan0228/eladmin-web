<template>
  <div class="workorder">
    <el-container>
      <el-container>
        <el-aside width="160px" class="workorder-menu">
          <div class="menu-tit">问题管理</div>
          <div>
            <el-menu>
              <el-menu-item index="1">
                <span slot="title" @click="questionList">问题列表</span>
              </el-menu-item>
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
              <div class="problem-ms mtop15" v-html="orderDesc">创建于1921年7月23日，1921年中国共产党成立后，确立了新民主主义革命的正确道路，让灾难深重的中国人民看到了新的希望、有了新的依靠。我们党探索出农村包围城市、武装夺取政权的正确革命道路</div>
              <div class="problem-tit mtop40">联系方式</div>
              <div class="problem-infor mtop15">
                <span v-html="user.name">联系人：张三</span>
                <span v-html="user.tel">联系方式：18623562356</span>
                <span v-html="user.company">单位名称：河南省信创综合服务保障中心</span>
                <span v-html="user.address">详细地址：河南省郑州市金水区企业联合大厦豫发中心</span>
              </div>
              <div class="problem-tit mtop40" v-html="orderNumber">工单编号：20211120356</div>
              <div class="mtop20">
                <el-timeline class="mtop20">
                  <el-timeline-item v-for="(item, index) in orderList" :key="index" placement="top">
                    <el-card>
                      <h4>
                        <span v-show="item.title">如何解决工单异常问题</span>
                        <span v-if="item.status === 0" class="gdtimelinezt ba2F489C">已接单</span>
                        <span v-else-if="item.status === 1" class="gdtimelinezt baFF8E3D">处理中</span>
                        <span v-else-if="item.status === 2" class="gdtimelinezt ba67c23a">已完成</span>
                        <span v-else class="gdtimelinezt ca1824">待接单</span>
                      </h4>
                      <p class="fsize12 g999">处理人：
                        <span v-html="item.name">刘某</span>
                      </p>
                      <p class="fsize12 g999" v-html="item.date">2020-12-06 13:00:02</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div>
                <el-button class="redbtn" @click="receivingOrder">接单</el-button>
                <el-button class="redborderbtn" @click="finishOrder">结单</el-button>
              </div>
            </div>

            <el-dialog title="结单" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="处理意见">
                  <el-input v-model="form.desc" type="textarea" placeholder="请输入您的处理意见" class="w70" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button class="redbtn" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      dialogFormVisible: false,
      form: {
        desc: ''
      },
      formLabelWidth: '120px',
      title: '【厂商问题】如何解决工单异常问题呢',
      orderDate: '2021-12-06 14:05:56',
      orderDesc: '2021年12月06日河南省疫情防控办公室通知，当前疫情问题仍旧非常严峻，望广大人民群众不要心存侥幸心理，注意个人防护！',
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
      orderNumber: '工单编号：20211120636',
      orderList: [
        { 'title': '如何解决工单异常问题',
          'status': 0,
          'name': '刘一某',
          'date': '2021-12-06 14:05:56'
        },
        { 'title': '如何解决工单异常问题',
          'status': 1,
          'name': '刘一某',
          'date': '2021-12-06 15:12:36'
        }
      ]
    }
  },
  created() {
    const { params } = this.$route
    this.id = params.id
  },
  mounted() {},
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .el-container{width: 100%;min-height: 80%;min-height: 80vh;}
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
  .gdtimelinezt{border-radius: 20px;padding:3px 17px;color: rgba(255, 255, 255, 0.9);font-size: 12px;margin-left:10px;width: 70px;height: 25px;}
  .redbtn{background-color: #ca1824;border-color: #ca1824;color: #fff;width: 90px;margin-left: 25px;}
  .redbtn:hover,.redbtn:active,.redbtn:focus{background-color: #ca1824;border-color: #ca1824;color: #fff;opacity: 0.8;}
  .redborderbtn{background-color: #fff;border-color: #ca1824;color: #ca1824;width: 90px;margin-left: 25px;}
  .redborderbtn:hover{background: #ffe7e9;color: #ca1824;}
</style>
