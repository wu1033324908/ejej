/*
 * @Author: your name
 * @Date: 2019-12-10 15:16:16
 * @LastEditTime: 2019-12-10 15:17:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\menberUser.js
 */
import request from '@/utils/request'
// 消息列表
export function list(data) {
  return request({
    url: '/AppUser/list',
    method: 'post',
    data
  })
}
// 消息列表
export function detail(data) {
  return request({
    url: '/AppUser/detail',
    method: 'post',
    data
  })
}
