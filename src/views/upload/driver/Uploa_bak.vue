<template>
  <div class="main-con">
    <div class="main-tit">{{ modifyId ? '驱动修改' : '驱动上传' }}</div>
    <div class="main-content">
      <!--表单组件-->
      <el-form ref="uploadForm" size="small" :model="uploadForm" :rules="rules" label-width="100px">
        <el-form-item label="驱动标题" prop="driverName">
          <el-input v-model="uploadForm.driverName" style="width: 670px" placeholder="请输入驱动标题" />
        </el-form-item>
        <el-form-item label="驱动链接" prop="driverPath">
          <el-input v-model="uploadForm.driverPath" :value="imageURL" style="width: 670px" placeholder="请输入驱动下载链接" :disabled="pathInputDisabled" />
          <el-upload
            ref="upload"
            :limit="1"
            :before-upload="beforeUpload"
            :auto-upload="true"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-remove="handleUploadRemove"
            :on-exceed="handleUploadOverLimit"
            :action="fileUploadApi + '?name='"
            :multiple="false"
            style="width: 670px;"
          >
            <div class=""><i class="el-icon-link" /> 附件上传</div>
            <!-- <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>-->
          </el-upload>
        </el-form-item>
        <el-form-item label="驱动简介" prop="driverIntroduction">
          <el-input v-model="uploadForm.driverIntroduction" :rows="5" type="textarea" style="width: 670px;" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="关联功能" prop="driverConnection">
          <el-cascader
            v-model="uploadForm.categories"
            :props="cascadeProps"
            :show-all-levels="true"
            clearable
            placeholder="请选择关联功能"
            style="width: 670px;"
            only-last="true"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click.native.prevent="handleUploadForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      @closed="dialogClosed"
    >
      <div>
        {{ dialogInfo.content }}
      </div>
      <div slot="footer" class="dialog-footer">
        <ita-button type="primary" @click="dialogConfirm">确认</ita-button>
        <ita-button v-if="dialogInfo.confirm" @click="dialogCancel">取消</ita-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  name: 'DriverUpload',
  data() {
    return {
      modifyId: null,
      dialogInfo: {
        visible: false,
        title: '提示',
        confirm: false,
        content: '提示信息',
        confirmCallback: undefined,
        cancelCallback: undefined
      },
      uploadForm: {
        driverName: '',
        driverPath: '',
        driverIntroduction: '',
        driverConnection: ''
      },
      pathInputDisabled: false,
      uploadFileName: '',
      uploadFilePaths: [],
      cascadeProps: {
        multiple: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.loadDriverCategories
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      rules: {
        driverName: [
          { required: true, message: '请输入驱动标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        driverPath: [
          { required: true, message: '请输入驱动下载链接或选择附件上传', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 7 到 200 个字符', trigger: 'blur' }
        ],
        driverIntroduction: [
          { required: true, message: '请输入驱动简介', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ],
        driverConnection: [
          { required: true, message: '请选择关联功能', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'fileUploadApi'
    ])
  },
  created() {
    const { params } = this.$route
    this.modifyId = params.id
  },
  methods: {
    handleUploadForm() {
    },
    loadDriverCategories(node, resolve) {
      // const { value } = node
      resolve([])
    },
    // 上传文件
    upload() {
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      if (this.uploadForm.driverPath) {
        this.loading = false
        this.$message.error('如果您指定了下载地址，则不能再上传文件')
        return false
      }
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      // this.fileName = file.name
      return isLt2M
    },
    handleUploadSuccess(response, file, fileList) {
      this.uploadFilePaths.push(response.data[0])
      this.uploadForm.driverPath = response.data[0]
      this.pathInputDisabled = true
    },
    // 监听上传失败
    handleUploadError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    },
    // 监听上传文件移除
    handleUploadRemove(file, fileList) {
      this.uploadFilePaths = this.$_.remove(this.uploadFilePaths, file.response.data[0])
      this.pathInputDisabled = false
      this.uploadForm.driverPath = ''
    },
    // 监听上传文件超过数量限制
    handleUploadOverLimit(files, fileList) {
      this.$message.error('只支持单个文件上传，请删除当前文件后再重新上传')
      // this.openDialog('提示', '只支持单个文件上传，请删除当前文件后再重新上传', false)
    },
    openDialog(title, content, confirm, confirmCallback, cancelCallback) {
      this.dialogInfo.title = title || this.dialogInfo.title
      this.dialogInfo.content = content || this.dialogInfo.content
      this.dialogInfo.confirm = confirm || false
      this.dialogInfo.confirmCallback = confirmCallback
      this.dialogInfo.cancelCallback = cancelCallback
      this.$nextTick(() => {
        this.dialogInfo.visible = true
      })
    },
    dialogClosed() {
      this.dialogInfo.title = '提示'
      this.dialogInfo.confirm = false
      this.dialogInfo.content = '提示信息'
      this.dialogInfo.confirmCallback = undefined
      this.dialogInfo.cancelCallback = undefined
    },
    dialogConfirm() {
      if (this.dialogInfo.confirmCallback) {
        this.dialogInfo.confirmCallback.call()
      }
      this.dialogInfo.visible = false
    },
    dialogCancel() {
      if (this.dialogInfo.cancelCallback) {
        this.dialogInfo.cancelCallback.call()
      }
      this.dialogInfo.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>

  .main-con {
    @apply bg-white;
    padding-bottom: 20px;

    .main-tit {
      font-size: 16px;
      color: #333;
      padding: 0 20px;
      line-height: 76px;
      height: 78px;
      border-bottom: 1px solid #ddd;
    }

    .main-content {
      padding: 20px;
    }
  }
</style>
