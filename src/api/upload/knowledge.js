import request from '@/utils/request'

export function getUploadKnowledgeList(data) {
  return request({
    url: `/members/getKnowledgeListByHybh`,
    method: 'post',
    data
  })
}

/**
 * 获取上传的知识库详情
 * @param knowledge_id
 * @returns {*}
 */
export function getUploadKnowledge(knowledge_id) {
  return request({
    url: '/members/detailsKnowledge',
    method: 'post',
    data: {
      knowledge_id
    }
  })
}

/**
 * 上传知识库
 * @param data
 * @returns {*}
 */
export function uploadKnowledge(data) {
  return request({
    url: '/members/uploadKnowledge',
    method: 'post',
    data
  })
}

/**
 * 上传知识库
 * @param data
 * @returns {*}
 */
export function updateKnowledge(data) {
  return request({
    url: '/members/updateKnowledge',
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

