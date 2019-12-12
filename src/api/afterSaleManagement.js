/*
 * @Author: your name
 * @Date: 2019-12-10 11:07:46
 * @LastEditTime: 2019-12-12 09:49:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\productOrder.js
 */
import request from '@/utils/request'

// 售后列表
export function orderAfterList(data) {
  return request({
    url: '/orderAfter/list',
    method: 'post',
    data
  })
}
// 同意/驳回售后
export function orderAfterCheck(data) {
  return request({
    url: '/orderAfter/check',
    method: 'post',
    data
  })
}
// 退款
export function orderAfterRefund(data) {
  return request({
    url: '/orderAfter/refund',
    method: 'post',
    data
  })
}
