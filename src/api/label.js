import request from '@/utils/request'
// 查询商品标签
export function getGoodsLableList(data) {
  return request({
    url: '/goodsLabel/list',
    method: 'post',
    data
  })
}
// 禁用商品标签
export function forbidGoodsLabel(data) {
  return request({
    url: '/goodsLabel/state',
    method: 'post',
    dataType: 'json',
    contentType: 'application/json',
    // headers: {
    //                  'Content-Type': 'application/json'
    //          },
    data
  })
}
// 新增商品标签
export function addGoodsLabel(data) {
  return request({
    url: '/goodsLabel/add',
    method: 'post',
    data
  })
}

// 更新商品标签
export function updateGoodsLabel(data) {
  return request({
    url: '/goodsLabel/update',
    method: 'post',
    data
  })
}
// 新增一个商品标签关联
export function addOneGoodsLabel(data) {
  return request({
    url: '/goodsLabel/addPool',
    method: 'post',
    data
  })
}
// 新增一个商品标签关联
export function deletedOneGoodsLabel(data) {
  return request({
    url: '/goodsLabel/deletedPool',
    method: 'post',
    data
  })
}
// 查询服务商标签
export function getServiceLable(data) {
  return request({
    url: '/service/list',
    method: 'post',
    data
  })
}
// 新增服务商标签
export function addServiceLable(data) {
  return request({
    url: '/service/add',
    method: 'post',
    data
  })
}
// 更新服务商标签
export function updateServiceLable(data) {
  return request({
    url: '/service/update',
    method: 'post',
    data
  })
}
// 禁用服务商标签
export function forbiddenServiceLable(data) {
  return request({
    url: '/service/state',
    method: 'post',
    data
  })
}
// 新增服务商介绍信息
export function detailServiceLable(data) {
  return request({
    url: '/introduce/addPool',
    method: 'post',
    data
  })
}
// 更新服务商介绍信息
export function updataDetailServiceLable(data) {
  return request({
    url: '/introduce/uploadPool',
    method: 'post',
    data
  })
}
// 删除服务商介绍信息
export function delDetailServiceLable(data) {
  return request({
    url: '/introduce/addPool',
    method: 'post',
    data
  })
}
// 新增服务商关联标签
export function addServiceUserLable(data) {
  return request({
    url: '/service/labelAdd',
    method: 'post',
    data
  })
}
// 查询某个服务商全部的标签
export function getOneServiceUserLable(data) {
  return request({
    url: '/service/label',
    method: 'post',
    data
  })
}
// 禁用服务商标签
export function deleteServiceUserLable(data) {
  return request({
    url: '/service/deletePool',
    method: 'post',
    data
  })
}
// 新增某个单独关联的服务商标签
export function addOneServiceUserLable(data) {
  return request({
    url: '/service/labelList',
    method: 'post',
    data
  })
}
// 商品标签删除
export function goodsLabelDelete(data) {
  return request({
    url: 'goodsLabel/delete',
    method: 'post',
    data
  })
}
// 服务商标签
export function serviceDelete(data) {
  return request({
    // url: '/service/delete',
    url: '/goodsLabel/delete',
    method: 'post',
    data
  })
}
// 商品标签图片上传
const goodUploadPath = process.env.BASE_API + '/goodsLabel/uploadImg'
export { goodUploadPath }
// 服务商标签图片上传
const serviceUploadPath = process.env.BASE_API + '/service/uploadImg'
export { serviceUploadPath }
// 服务商介绍信息图片上传
const introduceUploadPath = process.env.BASE_API + '/introduce/uploadImg'
export { introduceUploadPath }
