import request from '@/utils/request'

export function getUploadViedoList(data) {
  return request({
    url: `/video/upload/list`,
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
    url: `/video/upload/list`,
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

// 获取厂商列表
export function getFirmList() {
  return request({
    url: `/members/GetManufacturerList`,
    method: 'post'
  })
}

export function getVideoInfo(data) {
  return request({
    url: `/members/getVideo`,
    method: 'post',
    data
  })
}
export function detailsVideo(videoId) {
  return request({
    url: `/members/detailsVideo`,
    method: 'post',
    data: {
      videId: videoId
    }
  })
}

export function uploadVideo(data) {
  return request({
    url: '/members/uploadVideo',
    method: 'post',
    data
  })
}

export function updateVideo(data) {
  return request({
    url: '/members/updateVideo',
    method: 'post',
    data
  })
}
