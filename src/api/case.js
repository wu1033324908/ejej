import request from '@/utils/request'
// 案例列表
export function getCaseList(data) {
  return request({
    url: '/managerExample/list',
    method: 'post',
    data
  })
}
// 案例详情
export function getCaseDetails(data) {
  return request({
    url: '/managerExample/detail',
    method: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data
  })
}
// 案例更新
export function updataCase(data) {
  return request({
    url: '/managerExample/update',
    method: 'post',
    data
  })
}
// 保存案例
export function saveCase(data) {
  return request({
    url: '/managerExample/save',
    method: 'post',
    data
  })
}
// 案例禁用
export function forbidCase(data) {
  return request({
    url: '/managerExample/isUse',
    method: 'post',
    data
  })
}
// 案例启用
export function startCase(data) {
  return request({
    url: '/managerExample/disable',
    method: 'post',
    data
  })
}
// 案例删除
export function delCase(data) {
  return request({
    url: '/managerExample/delete',
    method: 'post',
    data
  })
}
// 案例图片上传
const uploadPath = process.env.BASE_API + '/managerExample/uploadImg'
export { uploadPath }
