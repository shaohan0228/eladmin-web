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

export function uploadKnowledge(data) {
  return request({
    url: '/knowledge/upload',
    method: 'post',
    data
  })
}

export function editKnowledge(data) {
  return request({
    url: `/knowledge/edit`,
    method: 'post',
    data
  })
}
