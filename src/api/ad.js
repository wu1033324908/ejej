import request from '@/utils/request'
// 广告列表
export function adList(data) {
  return request({
    url: '/advertisement/list',
    method: 'post',
    data
  })
}
// 轮播图新增
export function adCreate(data) {
  return request({
    url: '/advertisement/create',
    method: 'post',
    data
  })
}
// 轮播图修改
export function adUpdata(data) {
  return request({
    url: '/advertisement/update',
    method: 'post',
    data
  })
}
// 轮播图删除
export function adDel(data) {
  return request({
    url: '/advertisement/delete',
    method: 'post',
    data
  })
}
// 轮播图图片上传
const uploadPath = process.env.BASE_API + '/advertisement/uploadImg'
export { uploadPath }
