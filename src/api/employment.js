// 招聘
import request from '@/utils/request'

export function labourWorkList(data) {
  return request({
    url: '/labourRelease/findLabourReleaseList',
    method: 'post',
    data
  })
}
export function labourWorkCreate(data) {
  return request({
    url: '/labourRelease/saveLabourRelease',
    method: 'post',
    data
  })
}
export function labourWorkUpdata(data) {
  return request({
    url: '/labourRelease/updateLabourRelease',
    method: 'post',
    data
  })
}
export function labourWorkDel(data) {
  return request({
    url: '/labourRelease/delLabourRelease',
    method: 'post',
    data
  })
}
export function labourWorkInfo(data) {
  return request({
    url: '/labourRelease/findLabourReleaseDetail',
    method: 'post',
    data
  })
}
