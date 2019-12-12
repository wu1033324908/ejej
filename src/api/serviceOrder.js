/*
 * @Author: your name
 * @Date: 2019-12-12 09:49:26
 * @LastEditTime: 2019-12-12 11:20:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\serviceOrder.js
 */
import request from '@/utils/request'
export function serviceOrderlist(data) {
  return request({
    url: '/serviceOrder/list',
    method: 'post',
    data
  })
}

// 新建节点
export function saveFile(data) {
  return request({
    url: '/serviceOrder/saveFile',
    method: 'post',
    data
  })
}
// 服务订单详情
export function detail(data) {
  return request({
    url: '/serviceOrder/detail',
    method: 'post',
    data
  })
}
// 图片列表
export function photoList(data) {
  return request({
    url: '/serviceOrder/photoList',
    method: 'post',
    data
  })
}
