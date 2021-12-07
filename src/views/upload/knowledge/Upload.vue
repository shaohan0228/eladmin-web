<template>
  <div class="main-con">
    <div class="main-tit">知识上传</div>
    <div class="main-content">
      <!--表单组件-->
      <el-form ref="uploadForm" size="small" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="知识标题" prop="title">
          <el-input v-model="formData.title" style="width: 670px" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容详情" prop="content">
          <div ref="editor" class="content-editor pt-1" style="width: 670px" />
        </el-form-item>
        <el-form-item label="关联功能" prop="categories">
          <el-cascader
            v-model="formData.categories"
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
          <ita-button type="primary" size="medium" @click.native.prevent="doSubmit">提交</ita-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUploadKnowledge } from '@/api/upload/knowledge'
import E from 'wangeditor'
import { upload } from '@/utils/upload'
import { mapGetters } from 'vuex'
import { uploadKnowledge } from '@/api/upload/knowledge'
import ItaButton from '../../../components/ItaButton'

export default {
  components: { ItaButton },
  data() {
    return {
      modifyId: null,
      formData: {
        title: '',
        content: '',
        categories: []
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
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        categories: [
          { required: true, message: '请选择关联功能', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容详情', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi'
    ])
  },
  created() {
    const { params } = this.$route
    this.modifyId = params.id
  },
  mounted() {
    const _this = this
    const editor = new E(this.$refs.editor)
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
      this.formData.content = html
    }
    editor.config.onblur = (html) => {
      console.log('onblur', html) // 获取最新的 html 内容
      this.formData.content = html
      this.$refs.uploadForm.validateField('content', (message) => {
        console.log(`valid content error: ${message}`)
      })
    }
    editor.create()
    if (this.modifyId) {
      this.getKnowledge(this.modifyId)
    }
  },
  methods: {
    async getKnowledge(id) {
      const { data: knowledgeInfo } = await getUploadKnowledge(id)
      this.formData = knowledgeInfo
    },
    doSubmit() {
      this.$refs.uploadForm.validate(async(result) => {
        if (result) {
          await uploadKnowledge(this.formData)
        }
      })
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
