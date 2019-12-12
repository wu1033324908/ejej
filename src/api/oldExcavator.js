import request from '@/utils/request'
// 二手机列表
export function oldList(data) {
  return request({
    url: '/goodsLabel/list',
    method: 'post',
    data
  })
}

// 二手机详情
export function oldRead(data) {
  return request({
    url: '/oldGood/getOldDetails',
    method: 'post',
    data
  })
}

// 二手机新增
export function oldCreate(data) {
  return request({
    url: '/oldGood/create',
    method: 'post',
    data
  })
}
// 二手机修改
export function oldUpdata(data) {
  return request({
    url: '/goodsLabel/update',
    method: 'post',
    data
  })
}
// 二手机删除
export function oldDel(data) {
  return request({
    url: '/oldGood/delete',
    method: 'post',
    data
  })
}
// 二手机审核
export function oldCheck(data) {
  return request({
    url: '/oldGood/check',
    method: 'post',
    data
  })
}
// 二手机图片上传
const uploadPath = process.env.BASE_API + '/goodsLabel/uploadImg'
export { uploadPath }
