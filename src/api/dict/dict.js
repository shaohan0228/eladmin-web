import request from '@/utils/request'

/**
 * 视频、驱动 关联的话  用企业分类那个
 * 知识库 问题的话  用知识库分类那个
 */

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
    url: `/members/getEquipmentBYCompany`,
    method: 'post',
    data: {
      company_id: companyId,
      pid: pid || 0
    }
  })
}

/**
 * 获取驱动上传分类
 * @param pid
 * @returns {*}
 */
export function getDriverCategories(companyId, pid) {
  return request({
    url: `/members/getEquipmentBYCompany`,
    method: 'post',
    data: {
      company_id: companyId,
      pid: pid || 0
    }
  })
}
