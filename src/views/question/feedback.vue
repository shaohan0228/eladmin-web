<template>
  <div class="problem">
    <div class="banner">
      <div class="problem-tit">问题反馈</div>
    </div>
    <div class="problem-con w1200">
      <div class="problem-tit">问题反馈</div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="问题类型：">
          <el-radio-group>
            <el-radio-button v-for="(item, index) in questionType" :key="index" :label="item" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联功能：">
          <el-select v-model="form.type" multiple placeholder="最多选择5个标签" class="w60">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="form.name" class="w60" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="form.name" class="w60" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="form.name" class="w60" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="form.name" class="w60" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="事件标题：">
          <el-input v-model="form.name" class="w60" placeholder="请输入事件标题" />
        </el-form-item>
        <el-form-item label="事件描述：">
          <div ref="editor" class="content-editor pt-1 w60" />
        </el-form-item>
        <el-form-item label="验证码：" class="clearfix">
          <el-input v-model="code" class="w120 pull-left" placeholder="请输入验证码" />
          <a class="yanimg pull-left" @click="refreshCode">
            <s-identify :identify-code="identifyCode" />
          </a>
        </el-form-item>
        <el-form-item>
          <el-button class="redbtn" @click="doSubmit">提交</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
      <!-- 成功提示，先隐藏 -->
      <el-dialog title="" :modal-append-to-body="false" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div>
          <el-result class="clearfix" icon="success" title="反馈成功" style="display:block;padding:0 30px;" />
          <div class="fsize12 g999 p-left60 mtop10">您的问题已经反馈给相关的工作人员</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="redbtn">返回首页</el-button>
        </span>
      </el-dialog>
      <!-- 没有完善提示 -->
      <!-- <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="clearfix">
          <el-result class="clearfix pull-left" icon="warning" title="" style="display:inline-block;padding:0 0 0 30px;"></el-result>
          <div class="fsize12 g999 pull-left" style="margin-top:6px;">您需要完善相关信息，才能进行访问</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="redbtn">立即完善</el-button>
          <el-button>取消</el-button>
        </span>
      </el-dialog> -->
    </div>
    <div class="foot">
      <div class="w1200">
        <div class="foot-top clearfix">
          <div class="foot-item">
            <div class="fsize14 g333">联系方式</div>
            <div>
              <img src="../../assets/images/phone.png" width="18" alt="">
              <span class="fsize18 g333 fw mtop10">96596转1</span>
            </div>
          </div>
          <div class="foot-item">
            <div class="f-tit">新闻中心</div>
            <div class="f-link">行业新闻</div>
            <div class="f-link">实时动态</div>
          </div>
          <div class="foot-item">
            <div class="f-tit">问题反馈</div>
            <div class="f-link">问题反馈</div>
          </div>
          <div class="foot-item">
            <div class="f-tit">资源中心</div>
            <div class="f-link">知识查询</div>
            <div class="f-link">视频学习</div>
            <div class="f-link">驱动下载</div>
            <div class="f-link">兼容适配</div>
          </div>
          <div class="foot-item">
            <div class="f-tit">关于我们</div>
            <div class="f-link">关于我们</div>
          </div>
          <div class="foot-item">
            <div class="f-tit">关注我们</div>
            <img src="../../assets/images/homecode.png" width="120" alt="">
            <div class="p-left28 fsize14 g333">微信公众号</div>
          </div>
        </div>
        <div class="foot-b">
          <div class="fsize12 g666 mtop20">公司地址：河南省郑州市郑东新区企业联合大厦·豫发中心13层</div>
          <div class="fsize12 g666 mtop10">
            ©2021年河南省信创综合服务保障中心版权所有备案证号：
            <a class="g666" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">豫ICP备18011154号</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import SIdentify from '../../components/sidentify/index'
import { upload } from '@/utils/upload'

export default {
  components: { SIdentify },
  data() {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      code: '', // text框输入的验证码
      activeIndex: '2',
      dialogVisible: false,
      handleClose: false,
      form: {
        type: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        resource: '',
        desc: ''
      },
      questionType: [
        '厂商问题',
        '系统问题',
        '故障排查'
      ],
      options: []
    }
  },
  mounted() {
    const _this = this
    _this.identifyCode = ''
    _this.makeCode(_this.identifyCodes, 4)
    const editor = new E(_this.$refs.editor)
    // 文件上传
    editor.config.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(image => {
        files.forEach(image => {
          upload(_this.imagesUploadApi, image).then(data => {
            insert(data.data.url)
          })
        })
      })
    }
    editor.onchange = (html) => {
      _this.formData.content = html
    }
    editor.config.onblur = (html) => {
      _this.formData.content = html
      _this.$refs.uploadForm.validateField('content', (message) => {
        console.log(`valid content error: ${message}`)
      })
    }
    editor.create()
    if (this.modifyId) {
      this.getKnowledge(this.modifyId)
    }
  },
  created() {
    this.refreshCode()
  },
  methods: {
    // 验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 刷新
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
    doSubmit() {
      if (this.code === '') {
        alert('请输入验证码！')
        return
      }
      if (this.identifyCode !== this.code) {
        this.code = ''
        this.refreshCode()
        alert('请输入正确的验证码！')
        return
      }
      this.refreshCode()
      this.dialogVisible = true
    }
  }
}
</script>
<style>
  .w-e-toolbar{
    z-index: 2 !important;
  }
  .w-e-text-container{
    z-index: 1 !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .banner{background: url(../../assets/images/problem1.png);background-repeat: no-repeat;background-position: top center;height: 200px;}
  .problem-tit{font-size: 46px;color: #fff;text-align: center;padding-top:50px;}
  .problem-con{background: #fff;padding:20px;margin-top: -20px;margin-bottom: 40px;}
  .problem-tit{font-size: 24px;color: #333;padding: 30px;text-align: left;}
  .el-radio-button__inner:hover{color: #ca1824;}
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{background-color: #ca1824!important;border-color: #ca1824!important;-webkit-box-shadow: -1px 0 0 0 #ca1824;box-shadow: -1px 0 0 0 #ca1824;}
  .w60{width: 60%;}
  .w120{width:120px;}
  .yanimg{width:150px;height:40px;display: inline-block;margin-left: 10px;border-radius: 4px;overflow:hidden;}
  .yanimg img{display: block;width: 100%;height: 100%;}
  .el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{border-color: #ca1824;}
  .el-result .icon-warning{width: 30px;height: 30px;}
</style>
