/*
 * @Author: your name
 * @Date: 2019-12-10 16:32:36
 * @LastEditTime: 2019-12-17 15:43:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\commonselect.js
 */
import request from '@/utils/request'

export function getRegion(data) {
  return request({
    url: '/goods/getRegion',
    method: 'post',
    data
  })
}
// 机构列表
export function departList(data) {
  return request({
    url: '/depart/departList',
    method: 'post',
    data
  })
}

