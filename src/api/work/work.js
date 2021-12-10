import request from '@/utils/request'

// 获取工单列表
export function getWorkOrderList(data) {
  return request({
    url: `/members/workList`,
    method: 'post',
    data: {
      pageNum: data.page,
      showCount: data.size
    }
  })
}
// 获取工单详情信息
export function getWorkOrderDetails(id) {
  return request({
    url: '/members/detailsWork',
    method: 'post',
    data: {
      worksheetId: id
    }
  })
}
