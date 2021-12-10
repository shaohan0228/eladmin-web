import request from '@/utils/request'

/**
 * 获取知识查询分类
 * @param pid
 * @returns {*}
 */
export function getKnowledgeCategories(pid) {
  return request({
    url: `/members/getKnowledgetype`,
    method: 'post',
    data: {
      pid: pid || 0
    }
  })
}

/**
 * 获取视频上传分类
 * @param pid
 * @returns {*}
 */
export function getVideoCategories(companyId, pid) {
  return request({
    url: `/members/getKnowledgetype`,
    method: 'post',
    data: {
      companyId,
      pid: pid || 0
    }
  })
}

