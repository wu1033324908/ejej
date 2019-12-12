/*
 * @Author: your name
 * @Date: 2019-12-11 16:00:37
 * @LastEditTime: 2019-12-11 16:01:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\dayToDayAccount.js
 */
import request from '@/utils/request'
// 上架下架
export function orderWaterList(data) {
  return request({
    url: '/orderWater/list',
    method: 'post',
    data
  })
}
