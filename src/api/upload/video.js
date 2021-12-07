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
