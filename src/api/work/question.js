import request from '@/utils/request'

export function toQuestionFeedback(data) {
  return request({
    url: '/question/feedback',
    method: 'post',
    data
  })
}

export function toQuestionDetails(id) {
  return request({
    url: '/question/questionDetails/${id}',
    method: 'get'
  })
}

export function toQuestionList(data) {
  return request({
    url: '/question/list',
    method: 'post',
    data
  })
}

