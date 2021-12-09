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
    url: '/knowledge/getKnowSearchList',
    method: 'post',
    data
  })
}
export function getKnowListByKnowType(data) {
  return request({
    url: '/knowledge/getKnowListByKnowType',
    method: 'post',
    data
  })
}
export function getKnowCheck1() {
  return request({
    url: `/knowledge/getKnowCheck1`,
    method: 'get'
  })
}
export function getKnowCheck2(key) {
  return request({
    url: `/knowledge/getKnowCheck2/${key}`,
    method: 'get'
  })
}
export function getKnowCheck3(key) {
  return request({
    url: `/knowledge/getKnowCheck3/${key}`,
    method: 'get'
  })
}
