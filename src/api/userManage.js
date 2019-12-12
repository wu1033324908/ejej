/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:53:10
 * @LastEditTime: 2019-08-15 16:06:54
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 用户管理 => 信息咨询列表
 */
import request from '@/utils/request'
// 信息咨询列表
export function findMsg(data) {
  return request({
    url: '/msg/findMsg',
    method: 'post',
    data
  })
}

export function updateMsg(data) {
  return request({
    url: '/msg/updateMsg',
    method: 'post',
    data
  })
}
// 用户
export function userList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function userBlockUp(data) {
  return request({
    url: '/user/blockUp',
    method: 'post',
    data
  })
}
export function userDelete(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
