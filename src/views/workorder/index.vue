<template>
  <div>
    <div class="mleft100 mtop50">
      <span class="mtopf10">问题详情</span>
      <span class="mtop30"><hr></span>
      <p class="font-bold mtop10">【厂商问题】如何解决工单异常问题</p>
      <el-tag type="info" class="mtop10">鲲鹏驱动</el-tag>
      <el-tag type="info" class="mtop10">鲲鹏驱动</el-tag>
      <div class="mtop10 font-sans font12 grey10">2021-12-06 13:55:04</div>
      <div class="mtop30 mleft30">
        <div class="font-bold">问题描述</div>
        <div class="mtop10">
          工单异常的问题描述工单异常的问题描述工单异常的问题描述工单异常的问题描述工单异常的问题描述工单异常的问题描述工单异常的问题描述工单异常的问题描述
        </div>
        <div class="font-bold mtop30">联系方式</div>
        <div class="mtop10 grey30">
          <span>联系人：</span>
          <span>刘某</span>
          <span class="mleft30">联系方式：</span>
          <span>17630032017</span>
          <span class="mleft30">单位名称：</span>
          <span>河南省信创综合保障中心</span>
          <span class="mleft30">详细地址：</span>
          <span>河南省郑州市金水区企业联合大厦豫发中心</span>
        </div>
        <div class="font-bold mtop30">工单编号：2021120605</div>
        <div class="mtop30" style="height: 300px;">
          <div class="el-steps el-steps--vertical">
            <div class="el-step is-vertical" style="flex-basis: 50%;">
              <div class="el-step__head is-wait">
                <div class="el-step__line" style="margin-right: 0px;" />
                <div class="el-step__icon is-text step-icon" />
              </div>
              <div class="el-step__main">
                <div class="el-step__title is-wait">
                  <span class="black0">
                    如何解决工单异常问题
                  </span>
                  <el-button type="primary" round class="step-icon height25 mleft30">
                    已接单
                  </el-button>
                </div>
                <div class="el-step__description is-wait grey30">处理人：刘某</div>
                <div class="el-step__description is-wait grey30">2021-12-06 13:55:04</div>
              </div>
            </div>
            <div class="el-step is-vertical" style="flex-basis: 50%;">
              <div class="el-step__head is-wait">
                <div class="el-step__line" style="margin-right: 0px;" />
                <div class="el-step__icon is-text step-icon" />
              </div>
              <div class="el-step__main">
                <div class="el-step__title is-wait black0">
                  <span class="black0">
                    如何解决工单异常问题
                  </span>
                  <el-button type="primary" round class="step-icon height25 mleft30">
                    处理中
                  </el-button>
                </div>
                <div class="el-step__description is-wait grey30">处理人：刘某</div>
                <div class="el-step__description is-wait grey30">2021-12-06 13:55:04</div>
              </div>
            </div>
            <div data-v-29db17f6="" class="el-step is-vertical is-flex" style="flex-basis: 50%;">
              <div class="el-step__head is-wait">
                <div class="el-step__line" style="margin-right: 0px;" />
                <div class="el-step__icon is-text step-icon" />
              </div>
              <div class="el-step__main">
                <div class="el-step__title is-wait black0">
                  <span class="black0">
                    如何解决工单异常问题
                  </span>
                  <el-button type="primary" round class="step-icon height25 mleft30">
                    已完成
                  </el-button>
                </div>
                <div class="el-step__description is-wait grey30">处理人：刘某</div>
                <div class="el-step__description is-wait grey30">2021-12-06 13:55:04</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-row class="mtop30 mleft30">
        <el-button type="danger" class="width96 height38 font16">接单</el-button>
        <el-button plain class="width96 height38 red0 font16">结束</el-button>
      </el-row>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mtopf10{
    margin-top: -10px;
  }
  .mtop10{
    margin-top: 10px;
  }
  .mtop30{
    margin-top: 30px;
  }
  .mtop50{
    margin-top: 50px;
  }
  .mleft30{
    margin-left: 30px;
  }
  .mleft100{
    margin-left: 100px;
  }
  .font12{
    font-size: 12px;
  }
  .font16{
    font-size: 16px;
  }
  .grey10{
    color: #909399;
  }
  .grey30{
    color: #616368;
  }
  .red0{
    color: red;
  }
  .black0{
    color: black;
  }
  .width96{
    width: 96px;
  }
  .height25{
    height: 25px;
  }
  .height38{
    height: 38px;
  }
  .step-icon{
    background: #051593;
    border-color: #051593;
  }
  .xd{
    border-style: dashed;
  }
  .el-button--small.is-round {
    padding: 6px 15px;
  }
</style>
