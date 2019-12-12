/*
 * @Author: your name
 * @Date: 2019-12-10 11:07:46
 * @LastEditTime: 2019-12-11 14:45:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\recommend.js
 */
import request from '@/utils/request'

export function homeDAlist(data) {
  return request({
    url: '/homeAd/list',
    method: 'post',
    data
  })
}
// 主页推荐管理 删除
export function homeDAdelete(data) {
  return request({
    url: '/homeAd/delete',
    method: 'post',
    data
  })
}
// 主页推荐管理 更新
export function homeDAupdate(data) {
  return request({
    url: '/homeAd/update',
    method: 'post',
    data
  })
}
// 主页推荐管理 新增
export function homeDAAdd(data) {
  return request({
    url: '/homeAd/add',
    method: 'post',
    data
  })
}
// 服务商推荐模块管理新增
export function recommendAdd(data) {
  return request({
    url: '/recommend/add',
    method: 'post',
    data
  })
}
// 服务商推荐模块删除
export function recommendRemove(data) {
  return request({
    url: '/recommend/remove',
    method: 'post',
    data
  })
}
// 服务商推荐模块修改
export function recommendUpdate(data) {
  return request({
    url: '/recommend/update',
    method: 'post',
    data
  })
}
// 查询服务商推荐模块list
export function recommendList(data) {
  return request({
    url: '/recommend/list',
    method: 'post',
    data
  })
}
// 服务商推荐模块详情
export function recommendListDetail(data) {
  return request({
    url: '/recommend/recommendList',
    method: 'post',
    data
  })
}
// 服务商推荐模块删除服务商推荐模块关联
export function recommendRemovePool(data) {
  return request({
    url: '/recommend/removePool',
    method: 'post',
    data
  })
}
// 新增服务商关联推荐类别
export function recommendAddPool(data) {
  return request({
    url: '/recommend/addPool',
    method: 'post',
    data
  })
}
const uploadPath = process.env.BASE_API + '/homeAd/uploadImg'
export { uploadPath }
