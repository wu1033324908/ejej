/*
 * @Author: your name
 * @Date: 2020-02-28 15:03:45
 * @LastEditTime: 2020-02-28 17:40:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\merchants.js
 */
import request from '@/utils/request'

// 售后列表
export function merchantsList(data) {
  return request({
    url: '/merchants/list',
    method: 'post', data
  })
}
