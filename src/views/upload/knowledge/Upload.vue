<template>
  <div>更新知识库</div>
</template>

<script>
import { getUploadKnowledge } from '@/api/upload/knowledge'

export default {
  data() {
    return {
      modifyId: null,
      formData: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    const { params } = this.$route
    this.modifyId = params.id
  },
  mounted() {
    if (this.modifyId) {
      this.getKnowledge(this.modifyId)
    }
  },
  methods: {
    async getKnowledge(id) {
      const { data: knowledgeInfo } = await getUploadKnowledge(id)
      this.formData = knowledgeInfo
    }
  }
}
</script>
