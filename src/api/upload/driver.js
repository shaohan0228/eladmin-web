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
    url: '/driver/${id}',
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
export function getKownrankingList() {
  return request({
    url: `/driver/KownrankingList`,
    method: 'get'
  })
}

export function getFirmList() {
  return request({
    url: `/driver/FirmList`,
    method: 'get'
  })
}
export function addDownloadCount(data) {
  return request({
    url: `/driver/addDownloadCount`,
    method: 'post',
    data
  })
}

