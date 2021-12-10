import request from '@/utils/request'

export function getUploadDriverList(data) {
  return request({
    url: `/members/getDriveByhyhb`,
    method: 'post',
    data
  })
}

export function getUploadDriver(driverID) {
  return request({
    url: '/members/detailsDriver',
    method: 'post',
    data: {
      driverID
    }
  })
}
export function getUploadDriverListByQuery(data) {
  return request({
    url: `/members/getDrive`,
    method: 'post',
    data
  })
}

export function getCheckList(companyId) {
  return request({
    url: `members/getEquipmentBYCompany`,
    method: 'post',
    data: { company_id: companyId, pid: 0 }
  })
}
export function getKownrankingList() {
  return request({
    url: `/members/secondDriver`,
    method: 'post'
  })
}
// 获取厂商列表
export function getFirmList() {
  return request({
    url: `/members/GetManufacturerList`,
    method: 'post'
  })
}
export function addDownloadCount(driverId) {
  return request({
    url: `/members/downDriver`,
    method: 'post',
    data: { driverID: driverId }
  })
}

export function uploadDriver(data) {
  return request({
    url: '/members/uploadDriver',
    method: 'post',
    data
  })
}

export function updateDriver(data) {
  return request({
    url: '/members/updateDriver',
    method: 'post',
    data
  })
}
