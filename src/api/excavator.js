import request from '@/utils/request'
// 新机列表
export function list(data) {
  return request({
    url: '/good/getGoodList',
    method: 'post',
    data
  })
}

// 新机详情
export function read(data) {
  return request({
    url: '/good/getGoodDetails',
    method: 'post',
    data
  })
}

// 新机新增
export function create(data) {
  return request({
    url: '/good/create',
    method: 'post',
    data
  })
}
// 新机修改
export function updata(data) {
  return request({
    url: '/good/update',
    method: 'post',
    data
  })
}
// 新机删除
export function del(data) {
  return request({
    url: '/good/delete',
    method: 'post',
    data
  })
}
// 新机图片上传
const uploadPath = process.env.BASE_API + '/good/uploadImg'
export { uploadPath }
