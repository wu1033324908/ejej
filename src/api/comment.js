/*
 * @Author: your name
 * @Date: 2019-12-06 11:41:12
 * @LastEditTime: 2019-12-12 16:36:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\comment.js
 */
import request from '@/utils/request'

export function listComment(data) {
  return request({
    url: '/comment/list',
    method: 'post',
    data
  })
}
// 某个商品的全部评论
export function look(data) {
  return request({
    url: '/comment/look',
    method: 'post',
    data
  })
}
// 评论修改接口
export function updateComment(data) {
  return request({
    url: '/comment/update',
    method: 'post',
    data
  })
}
// 评论删除
export function deleteComment(data) {
  return request({
    url: '/comment/delete',
    method: 'post',
    data
  })
}
// 回复评论
export function replyComment(data) {
  return request({
    url: '/comment/reply',
    method: 'post',
    data
  })
}
