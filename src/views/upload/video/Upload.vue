<template>
  <div class="main-con">
    <div class="main-tit">{{ modifyId ? '视频修改' : '视频上传' }}</div>
    <div class="main-content">
      <!--表单组件-->
      <el-form ref="uploadForm" size="small" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="视频标题" prop="title">
          <el-input v-model="formData.title" style="width: 670px" placeholder="请输入视频标题" />
        </el-form-item>
        <el-form-item label="视频链接" prop="path">
          <el-input v-model="formData.path" style="width: 670px" placeholder="请输入视频下载链接" :disabled="pathInputDisabled" />
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
            accept=".mp4,.m4v"
            style="width: 670px;"
          >
            <div class=""><i class="el-icon-link" /> 选择附件</div>
            <!-- <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>-->
          </el-upload>
        </el-form-item>
        <el-form-item label="视频简介" prop="introduction">
          <el-input
            v-model="formData.introduction"
            :rows="5"
            type="textarea"
            style="width: 670px;"
            placeholder="请输入简介"
          />
        </el-form-item>
        <el-form-item label="关联功能" prop="categories">
          <el-cascader
            v-model="formData.categories"
            :disabled="modifyId"
            :props="cascadeProps"
            :show-all-levels="true"
            clearable
            placeholder="请选择关联功能"
            style="width: 670px;"
            only-last="true"
          />
        </el-form-item>
        <el-form-item>
          <ita-button type="primary" @click.native.prevent="uploadVideo">提交</ita-button>
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

<script type="text/javascript">
import { mapGetters } from 'vuex'
import ItaButton from '../../../components/ItaButton'
import { updateVideo, uploadVideo } from '../../../api/upload/video'
import { getVideoCategories } from '../../../api/dict/dict'

export default {
  name: 'VideoUpload',
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
        path: '',
        introduction: '',
        categories: []
      },
      pathInputDisabled: false,
      uploadFileName: '',
      uploadFilePaths: [],
      supportFileType: ['.mp4', '.m4a'],
      acceptFile: '.mp4,.m4a',
      cascadeProps: {
        multiple: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.loadVideoCategories
      },
      rules: {
        title: [
          { required: true, message: '请输入视频标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入视频下载链接或选择附件上传', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 7 到 200 个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入视频简介', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ],
        categories: [
          { required: true, message: '请选择关联功能', trigger: 'blur' }
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
    this.companyId = this.$store.getters.user.company_id
  },
  methods: {
    async uploadVideo() {
      this.$refs.uploadForm.validate(async(result) => {
        if (!result) {
          return
        }
        const updateParams = {
          introduce: this.formData.introduction,
          address: this.formData.path,
          title: this.formData.title
        }

        let uploadResult
        if (this.modifyId) {
          updateParams.videoId = this.modifyId
          uploadResult = await updateVideo(updateParams)
        } else {
          updateParams.company_id = this.companyId
          updateParams.equipment_id = this.formData.categories[this.formData.categories.length - 1]
          uploadResult = await uploadVideo(updateParams)
        }

        if (uploadResult && uploadResult.code === 200) {
          this.openDialog(
            '成功',
            '视频上传成功，点击确定返回列表页面',
            false,
            () => { this.$router.push({ path: '/upload_manage/video' }) },
          )
        } else {
          this.openDialog(
            '失败',
            `视频上传失败, 原因： ${uploadResult.msg} 。<br/> 点击确定返回列表页面`,
            false,
            () => { this.$router.push({ path: '/upload_manage/video' }) }
          )
        }
      })
    },
    async loadVideoCategories(node, resolve) {
      const { value } = node
      await getVideoCategories(this.companyId, value).then((res) => {
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
    // 上传文件
    upload() {
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      const fileExt = file.name.substring(file.name.lastIndexOf('.'))
      if (!(this.supportFileType.indexOf(fileExt) >= 0)) {
        this.loading = false
        this.$message.error(`视频仅支持 ${this.supportFileType.join(', ')} 类型 `)
        return false
      }

      if (this.formData.path) {
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
      this.formData.path = response.data[0]
      this.pathInputDisabled = true
      this.$refs.uploadForm.validateField('path')
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
      if (file.response) {
        this.uploadFilePaths = this.$_.remove(this.uploadFilePaths, file.response.data[0])
        this.pathInputDisabled = false
        this.formData.path = ''
      }
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
