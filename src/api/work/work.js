import request from '@/utils/request'

export function getWorkOrderList(data) {
  return request({
    url: `/workorder/list`,
    method: 'post',
    data
  })
}

export function getWorkOrderDetails(id) {
  return request({
    url: '/workorder/workorderDetails/${id}',
    method: 'get'
  })
}
