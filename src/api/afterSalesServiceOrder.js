/*
 * @Author: your name
 * @Date: 2019-12-12 09:49:26
 * @LastEditTime: 2019-12-17 16:47:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\afterSalesServiceOrder.js
 */
import request from '@/utils/request'
export function serviceOrderlist(data) {
  return request({
    url: '/serviceOrder/list',
    method: 'post',
    data
  })
}

// 订单发货
export function serviceOrderAfterCheck(data) {
  return request({
    url: '/serviceOrderAfter/check',
    method: 'post',
    data
  })
}
