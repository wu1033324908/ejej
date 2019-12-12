/*
 * @Author: your name
 * @Date: 2019-12-10 16:32:36
 * @LastEditTime: 2019-12-10 16:52:41
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

