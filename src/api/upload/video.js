import request from '@/utils/request'

export function getUploadVideoList(data) {
  return request({
    url: `/members/getVideoByHybh`,
    method: 'post',
    data
  })
}

export function getUploadVideo(videoId) {
  return request({
    url: '/members/detailsVideo',
    method: 'post',
    data: {
      videId: videoId
    }
  })
}
export function getUploadDriverListByQuery(data) {
  return request({
    url: `/video/upload/list`,
    method: 'post',
    data
  })
}

export function getCheckList(firmId) {
  return request({
    url: `/video/classify/${firmId}`,
    method: 'get'
  })
}

export function getFirmList() {
  return request({
    url: `/video/FirmList`,
    method: 'get'
  })
}

export function getVideoInfo(firmId) {
  return request({
    url: `/video/getVideoInfo/${firmId}`,
    method: 'get'
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
