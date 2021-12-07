<template>
  <div class="main-con">
    <div class="main-tit">上传驱动</div>
    <div class="main-content">
      <!--表单组件-->
      <el-form ref="uplaodForm" size="small" :model="uplaodForm" :rules="rules" label-width="100px">
        <el-form-item label="驱动标题" prop="driverName">
          <el-input v-model="uplaodForm.driverName" style="width: 670px" placeholder="请输入驱动标题" />
        </el-form-item>
        <el-form-item label="驱动链接" prop="driverPath">
          <el-input v-model="uplaodForm.driverPath" :value="imageURL" style="width: 670px" placeholder="请输入驱动下载链接" />
          <el-upload
            ref="upload"
            :limit="1"
            :before-upload="beforeUpload"
            :auto-upload="true"
            :on-success="handleSuccess"
            :on-error="handleError"
            :action="fileUploadApi"
            style="width: 670px;"
          >
            <div class=""><i class="el-icon-link" /> 附件上传</div>
            <!-- <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>-->
          </el-upload>
        </el-form-item>
        <el-form-item label="驱动简介" prop="driverIntroduction">
          <el-input v-model="uplaodForm.driverIntroduction" :rows="5" type="textarea" style="width: 670px;" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="关联功能" prop="driverConnection">
          <el-cascader
            :options="options"
            :props="{ multiple: false, checkStrictly: true }"
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
  </div>

</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import CRUD from '@crud/crud'
export default {
  name: 'DriverUpload',
  computed: {
    ...mapGetters([
      'baseApi',
      'fileUploadApi'
    ])
  },
  data() {
    return {
      uplaodForm: { driverName: '', driverPath: '', driverIntroduction: '', driverConnection: '' },
      fileList: [],
      imageURL: '',
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
  methods: {
    // 上传文件
    upload() {
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }

      return isLt2M
    },
    handleSuccess(response, file, fileList) {
      this.imageURL = URL.createObjectURL(file.raw)
      this.crud.notify('上传成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      this.$refs.upload.clearFiles()
      this.crud.resetForm()
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    },
    handleUploadForm() {
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
