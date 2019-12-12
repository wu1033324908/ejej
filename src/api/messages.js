/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 15:51:25
 * @LastEditTime: 2019-12-09 11:06:43
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
// 消息列表
export function list(data) {
  return request({
    url: '/msg/list',
    method: 'post',
    data
  })
}
// 新增站内消息
export function save(data) {
  return request({
    url: '/msg/save',
    method: 'post',
    data
  })
}
// 修改站内消息
export function edit(data) {
  return request({
    url: '/msg/update',
    method: 'post',
    data
  })
}
// 取消发送消息
export function rollback(data) {
  return request({
    url: '/msg/rollback',
    method: 'post',
    data
  })
}
// 消息查看
export function pushRead(data) {
  return request({
    url: '/msg/detail',
    method: 'post',
    data
  })
}
// 用户列表
export function AppUserList(data) {
  return request({
    url: '/AppUser/list',
    method: 'post',
    data
  })
}
