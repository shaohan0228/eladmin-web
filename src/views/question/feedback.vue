<template>
  <div class="problem">
    <div class="banner">
      <div class="problem-nannertit">问题反馈</div>
    </div>
    <div class="problem-con w1200">
      <div class="problem-tit">问题反馈</div>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules" class="problem-form">
        <el-form-item label="问题类型：" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button v-for="(item, index) in questionType" :key="index" :label="item.label" :value="item.value" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联功能：" prop="options">
          <el-select v-model="form.options" multiple placeholder="最多选择5个标签" class="w60">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人：" prop="name">
          <el-input v-model="form.name" class="w60" placeholder="请输入联系人姓名" />
        </el-form-item>
        <el-form-item label="联系方式：" prop="tel">
          <el-input v-model="form.tel" class="w60" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="单位名称：" prop="company">
          <el-input v-model="form.company" class="w60" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input v-model="form.address" class="w60" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="事件标题：" prop="title">
          <el-input v-model="form.title" class="w60" placeholder="请输入事件标题" />
        </el-form-item>
        <el-form-item label="事件描述：" prop="content">
          <div ref="editor" class="content-editor pt-1 w60" />
        </el-form-item>
        <el-form-item label="验证码：" class="clearfix" prop="code">
          <el-input v-model="code" class="w120 pull-left" placeholder="请输入验证码" />
          <a class="yanimg pull-left" @click="refreshCode">
            <s-identify :identify-code="identifyCode" />
          </a>
        </el-form-item>
        <el-form-item>
          <el-button class="redbtn" @click="doSubmit">提交</el-button>
          <!--<el-button>取消</el-button>-->
        </el-form-item>
      </el-form>
      <!-- 成功提示，先隐藏 -->
      <el-dialog title="" :modal-append-to-body="false" :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
        <div>
          <el-result class="clearfix" icon="success" title="反馈成功" style="display:block;padding:0 30px;" />
          <div class="fsize12 g999 p-left60 mtop10">您的问题已经反馈给相关的工作人员</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="redbtn" @click="toIndex" v-html="indexMessage">返回首页</el-button>
        </span>
      </el-dialog>
    </div>
    <Footer />
  </div>
</template>
<script>
import E from 'wangeditor'
import SIdentify from '../../components/sidentify/index'
import { upload } from '@/utils/upload'
import Footer from '@/components/Footer'
import { toQuestionFeedback } from '@/api/quetsion/question'

export default {
  components: { SIdentify, Footer },
  data() {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      msg: '', // 返回信息提示
      code: '', // text框输入的验证码
      activeIndex: '2',
      dialogVisible: false,
      handleClose: false,
      timer: null,
      countdown: 5,
      indexMessage: '返回首页(5s)',
      form: {
        type: {},
        options: [],
        name: '',
        tel: '',
        company: '',
        address: '',
        title: '',
        content: ''
      },
      questionType: [
        { 'label': '厂商问题', 'value': '1' },
        { 'label': '系统问题', 'value': '2' },
        { 'label': '故障排查', 'value': '3' }
      ],
      options: [
        { 'label': '鲲鹏驱动1', 'value': '1' },
        { 'label': '麒麟芯片2', 'value': '2' },
        { 'label': '麒麟芯片3', 'value': '3' },
        { 'label': '麒麟芯片11', 'value': '4' },
        { 'label': '麒麟芯片22', 'value': '5' },
        { 'label': '麒麟芯片', 'value': '6' },
        { 'label': '鸿蒙系统', 'value': '7' }
      ],
      rules: {
        type: [
          { required: true, message: '请选择问题类型', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '请选择关联功能', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入事件标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容详情', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const _this = this
    _this.identifyCode = ''
    _this.makeCode(_this.identifyCodes, 4)
    const editor = new E(this.$refs.editor)
    // 配置菜单
    editor.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.config.placeholder = '请填写内容详情'
    // 取消自动 focus
    editor.config.focus = false
    // 文件上传
    editor.config.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(image => {
        files.forEach(image => {
          upload(this.imagesUploadApi, image).then(data => {
            insert(data.data.url)
          })
        })
      })
    }
    editor.onchange = (html) => {
      this.form.content = html
    }
    editor.config.onblur = (html) => {
      this.form.content = html
      this.$refs.form.validateField('content', (message) => {
        console.log(`valid content error: ${message}`)
      })
    }
    editor.create()
  },
  created() {
    this.refreshCode()
  },
  destroyed() {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer)
    this.timer = null
    this.countdown = 5
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
      const _this = this
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (_this.code === '') {
            _this.$alert('请输入验证码！', '温馨提示')
            return
          }
          if (_this.identifyCode !== _this.code) {
            _this.code = ''
            _this.refreshCode()
            _this.$alert('请输入正确的验证码！', '温馨提示')
            return
          }
          _this.refreshCode()
          if (_this.form.options.length > 5) {
            _this.$alert('最多选择5个标签哦~！', '温馨提示')
          }
          const _data = await toQuestionFeedback(_this.form)
          const _data_ = JSON.parse(JSON.stringify(_data))
          if (_data_.code === 200) {
            _this.dialogVisible = true
            clearInterval(_this.timer)
            _this.timer = null
            _this.timer = setInterval(() => {
              _this.countdown--
              _this.indexMessage = '返回首页(' + _this.countdown + 's)'
              if (_this.countdown === 0) {
                _this.$router.push('/')
              }
            }, 1000)
          } else {
            _this.$alert(_data_.msg, '温馨提示')
          }
        }
      })
    },
    toIndex() {
      this.$router.push({ path: '/' })
    },
    closeDialog() {
      this.handleClose = true
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
  .problem{background: #f8f8f8;}
  .banner{background: url(../../assets/images/problem1.png);background-repeat: no-repeat;background-position: top center;height: 200px;}
  .problem-nannertit{font-size: 46px;color: #fff;text-align: center;padding-top:50px;}
  .problem-con{background: #fff;padding:20px;margin-top: -20px;margin-bottom: 40px;}
  .problem-tit{font-size: 24px;color: #333;padding: 30px;text-align: left;}
  .el-radio-button__inner:hover{color: #ca1824!important;}
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{background-color: #ca1824!important;border-color: #ca1824!important;-webkit-box-shadow: -1px 0 0 0 #ca1824;box-shadow: -1px 0 0 0 #ca1824;}
  .w60{width: 60%;}
  .w120{width:120px;}
  .yanimg{width:150px;height:40px;display: inline-block;margin-left: 10px;border-radius: 4px;overflow:hidden;}
  .yanimg img{display: block;width: 100%;height: 100%;}
  .el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{border-color: #ca1824;}
  .el-result .icon-warning{width: 30px;height: 30px;}
  .problem-con .problem-form .el-form-item__content{margin-left:120px!important;}
</style>
