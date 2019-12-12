/*
 * @Author: your name
 * @Date: 2019-12-10 11:07:46
 * @LastEditTime: 2019-12-10 11:10:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\productOrder.js
 */
import request from '@/utils/request'

export function orderlist(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data
  })
}

// 订单发货
export function orderdeliver(data) {
  return request({
    url: '/order/deliver',
    method: 'post',
    data
  })
}
// 订单详情
export function orderdetail(data) {
  return request({
    url: '/order/detail',
    method: 'post',
    data
  })
}
