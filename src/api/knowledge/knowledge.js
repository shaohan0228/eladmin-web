import request from '@/utils/request'

// 获取知识列表
export function getKnowledgeList(data) {
  return request({
    url: `/members/getKnowledgeList`,
    method: 'post',
    data: {
      pageNum: data.page,
      showCount: data.size,
      typeid: 13,
      serchemes: ''
    }
  })
}
// 获取知识详情信息
export function getKnowledgeDetails(id) {
  return request({
    url: '/members/detailsKnowledge',
    method: 'post',
    data: {
      knowledge_id: id
    }
  })
}
