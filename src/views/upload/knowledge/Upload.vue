<template>
  <div class="main-con">
    <div class="main-tit">{{ modifyId ? '知识修改' : '知识上传' }}</div>
    <div class="main-content">
      <!--表单组件-->
      <el-form ref="uploadForm" size="small" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="知识标题" prop="title">
          <el-input v-model="formData.title" style="width: 670px" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容详情" prop="content">
          <div ref="editor" class="content-editor pt-1" style="width: 670px" />
        </el-form-item>
        <el-form-item v-if="!disableEditorCategories" label="关联功能" prop="categories">
          <el-cascader
            v-model="formData.categories"
            :props="cascadeProps"
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
    <el-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @closed="dialogClosed"
    >
      <div v-html="dialogInfo.content" />
      <div slot="footer" class="dialog-footer">
        <ita-button type="primary" @click="dialogConfirm">确认</ita-button>
        <ita-button v-if="dialogInfo.confirm" @click="dialogCancel">取消</ita-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUploadKnowledge, uploadKnowledge, updateKnowledge } from '@/api/upload/knowledge'
import E from 'wangeditor'
import { upload } from '@/utils/upload'
import { mapGetters } from 'vuex'
import ItaButton from '../../../components/ItaButton'
import { getKnowledgeCategories } from '../../../api/dict/dict'

let editor

export default {
  components: { ItaButton },
  data() {
    return {
      modifyId: null,
      companyId: null,
      dialogInfo: {
        visible: false,
        title: '提示',
        confirm: false,
        content: '提示信息',
        confirmCallback: undefined,
        cancelCallback: undefined
      },
      formData: {
        title: '',
        content: '',
        categories: []
      },
      disableEditorCategories: false,
      cascadeProps: {
        multiple: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.loadKnowledgeCategories
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
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
      'fileUploadApi'
    ])
  },
  created() {
    const { params } = this.$route
    this.modifyId = params.id
    this.companyId = this.$store.getters.user.company_id
  },
  mounted() {
    const _this = this
    editor = new E(this.$refs.editor)

    if (this.modifyId) {
      this.loadKnowledgeInfo(this.modifyId)
    }

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
    editor.onchange = (html) => {
      this.formData.content = html
    }
    editor.config.onblur = (html) => {
      this.formData.content = html
      this.$refs.uploadForm.validateField('content', () => {
      })
    }

    editor.config.zIndex = 1050

    editor.config.customUploadImg = async(files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(image => {
        upload(_this.fileUploadApi, image).then(res => {
          const url = res.data.data[0]
          insert(url)
        })
      })
    }

    editor.create()

    if (this.modifyId) {
      this.loadKnowledgeInfo(this.modifyId)
    }
  },
  methods: {
    async loadKnowledgeInfo(knowledgeId) {
      const res = await getUploadKnowledge(knowledgeId)
      if (res && res.code === 200) {
        const { data } = res
        this.formData.title = data.problem_description
        this.formData.content = data.problem_solution
        editor.txt.html(data.problem_solution)
        this.disableEditorCategories = true
        this.formData.categories.push[data.equipment_id]
      } else {
        this.openDialog('错误', '无法获取视频信息', false, () => { this.$routers.push({ path: 'upload_manage/knowledge' }) })
      }
    },
    async loadKnowledgeCategories(node, resolve) {
      const { value } = node
      await getKnowledgeCategories(value).then((res) => {
        const _result = res.data.contents
        const nodes = _result.map((_item) => {
          return {
            label: _item.type_name,
            value: _item.knowledge_type_id
          }
        })
        if (nodes.length === 0) {
          resolve()
        } else {
          resolve(nodes)
        }
      }).catch(() => {
        resolve([])
      })
    },
    doSubmit() {
      this.$refs.uploadForm.validate(async(result) => {
        if (!result) {
          return
        }

        const updateParams = {
          problem_description: this.formData.title,
          knowledge_type_id: undefined,
          problem_solution: this.formData.content,
          company_id: this.company_id,
          equipment_id: this.formData.categories[this.formData.categories.length - 1],
          label: undefined
        }

        let uploadResult
        const operateType = this.modifyId ? '知识库更新' : '知识库上传'
        if (this.modifyId) {
          updateParams.knowledgeId = this.modifyId
          uploadResult = await updateKnowledge(updateParams)
        } else {
          updateParams.company_id = this.companyId
          updateParams.equipment_id = this.formData.categories[this.formData.categories.length - 1]
          uploadResult = await uploadKnowledge(updateParams)
        }

        if (uploadResult && uploadResult.code === 200) {
          this.openDialog(
            '成功',
            `${operateType}成功，点击确定返回列表页面`,
            false,
            () => { this.$router.push({ path: '/upload_manage/knowledge' }) },
          )
        } else {
          this.openDialog(
            '失败',
            `${operateType}失败, 原因： ${uploadResult.msg} 。<br/> 点击确定返回列表页面`,
            false,
            () => { this.$router.push({ path: '/upload_manage/knowledge' }) }
          )
        }
      })
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
