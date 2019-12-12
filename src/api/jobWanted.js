// 求职
import request from '@/utils/request'

export function labourWorkList(data) {
  return request({
    url: '/labourWork/findLabourWorkList',
    method: 'post',
    data
  })
}
export function labourWorkCreate(data) {
  return request({
    url: '/labourWork/saveLabourWork',
    method: 'post',
    data
  })
}
export function labourWorkUpdata(data) {
  return request({
    url: '/labourWork/updateLabourWork',
    method: 'post',
    data
  })
}
export function labourWorkDel(data) {
  return request({
    url: '/labourWork/delLabourWork',
    method: 'post',
    data
  })
}
export function labourWorkInfo(data) {
  return request({
    url: '/labourWork/findLabourWorkDetail',
    method: 'post',
    data
  })
}
