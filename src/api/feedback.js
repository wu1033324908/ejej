/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:25:16
 * @LastEditTime: 2019-08-16 09:25:39
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
// 新机列表
export function feedbackList(data) {
  return request({
    url: '/feedback/list',
    method: 'post',
    data
  })
}
