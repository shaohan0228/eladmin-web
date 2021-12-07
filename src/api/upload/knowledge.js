import request from '@/utils/request'

export function getUploadKnowledgeList(data) {
  return request({
    url: `/knowledge/upload/list`,
    method: 'post',
    data
  })
}

export function getUploadKnowledge(id) {
  return request({
    url: '/knowledge/${id}',
    method: 'get'
  })
}
