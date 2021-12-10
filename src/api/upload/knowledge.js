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
export function getHotKeyList() {
  return request({
    url: `/knowledge/hotKey`,
    method: 'get'
  })
}
export function getKnowListByKnowId(knowId) {
  return request({
    url: `/knowledge/getKnowListByKnowId/${knowId}`,
    method: 'get'
  })
}
export function getKnowSearchList(data) {
  return request({
    url: '/members/getKnowledgeList',
    method: 'post',
    data
  })
}

export function getKnowCheck(pid) {
  return request({
    url: `/members/getKnowledgetype`,
    method: 'post',
    data: {
      pid: pid
    }
  })
}

