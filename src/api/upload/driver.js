import request from '@/utils/request'

export function getUploadDriverList(data) {
  return request({
    url: `/driver/upload/list`,
    method: 'post',
    data
  })
}

export function getUploadDriver(id) {
  return request({
    url: '/drivere/${id}',
    method: 'get'
  })
}
