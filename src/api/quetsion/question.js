import request from '@/utils/request'
// 反馈问题
export function toQuestionFeedback(data) {
  return request({
    url: '/members/uploadQuestion',
    method: 'post',
    data
  })
}
// 获取问题详情---包含问题所拆解工单号
export function toQuestionDetails(id) {
  return request({
    url: '/members/detailsQuestion/${id}',
    method: 'post',
    data: {}
  })
}
// 问题列表
export function toQuestionList(data) {
  return request({
    url: '/members/listQuestion',
    method: 'post',
    data: {
      pageNum: data.page,
      showCount: data.size
    }
  })
}

