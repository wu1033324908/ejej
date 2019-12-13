/*
 * @Author: your name
 * @Date: 2019-12-13 14:13:38
 * @LastEditTime: 2019-12-13 14:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\work.js
 */
import request from '@/utils/request'
// 服务端人员禁用删除接口(零工删除)
export function managerUserDelete(data) {
  return request({
    url: '/managerUser/delete',
    method: 'post',
    data
  })
}
