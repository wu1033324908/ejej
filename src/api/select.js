/**
 * @description: 通用下拉框
 */
import request from '@/utils/request'
// import { MessageBox } from 'element-ui'
// 品牌下拉框
export function findBrand(data) {
  return request({
    url: '/common/findBrand',
    method: 'post',
    data
  })
}
// 后台配件下拉框
export function findCategoryHomePage(data) {
  return request({
    url: '/category/findCategoryHomePage',
    method: 'post',
    data
  })
}
// 区域下拉框
export function getRegion(data) {
  return request({
    url: '/common/getRegion',
    method: 'post',
    data
  })
}
// 通用下拉框
export function getComboBox(data) {
  return request({
    url: '/kv/getComboBox',
    method: 'post',
    data
  })
}

// export function getCommonSelect(opts) {
//   if (opts.key_group_name === undefined || typeof opts.callback !== 'function') return
//   const key_group_name = opts.key_group_name
//   const callback = opts.callback || ''
//   getComboBox({ key_group_name }).then(response => {
//     callback(response.data)
//   }).catch(response => {
//     MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
//       confirmButtonText: '确定',
//       type: 'error'
//     })
//   })
// }
