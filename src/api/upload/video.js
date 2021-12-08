import request from '@/utils/request'

export function getUploadViedoList(data) {
  return request({
    url: `/knowledge/upload/list`,
    method: 'post',
    data
  })
}

export function getUploadVideo(id) {
  return request({
    url: '/video/${id}',
    method: 'get'
  })
}
export function getUploadDriverListByQuery(data) {
  return request({
    url: `/driver/upload/list`,
    method: 'post',
    data
  })
}

export function getCheckList(firmId) {
  return request({
    url: `/driver/classify/${firmId}`,
    method: 'get'
  })
}

export function getFirmList() {
  return request({
    url: `/driver/FirmList`,
    method: 'get'
  })
}
