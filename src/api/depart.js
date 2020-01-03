import request from '@/utils/request'
// 查询公司列表
export function departList(data) {
  return request({
    url: '/depart/departList',
    method: 'post',
    data
  })
}
// 查询单个公司
export function deparSearch(data) {
  return request({
    url: '/depart/departOne',
    method: 'post',
    data
  })
}
// 修改公司
export function departEdit(data) {
  return request({
    url: '/depart/update',
    method: 'post',
    data
  })
}
// 删除公司
export function departDelete(data) {
  return request({
    url: '/depart/delete',
    method: 'post',
    data
  })
}
// 添加公司
export function departAdd(data) {
  return request({
    url: '/depart/addDepart',
    method: 'post',
    data
  })
}
// 头像图片上传
const uploadHeadUrlPath = process.env.BASE_API + '/managerUser/uploadImg'
export { uploadHeadUrlPath }
// 营业执照图片上传
const uploadPermitUrlPath = process.env.BASE_API + '/depart/uploadImg'
export { uploadPermitUrlPath }
// 身份证图片上传
const uploadIdCardUrlPath = process.env.BASE_API + '/managerUser/uploadImg'
export { uploadIdCardUrlPath }
