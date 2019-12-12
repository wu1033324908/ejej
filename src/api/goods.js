import request from '@/utils/request'

export function listGoods(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data
  })
}

export function categoryGoods(data) {
  return request({
    url: '/category/l',
    method: 'post',
    data
  })
}
// 上架下主商品
export function stateGoods(data) {
  return request({
    url: '/goods/state',
    method: 'post',
    data
  })
}
// 编辑商品条件
export function editGoodsCondition(data) {
  return request({
    url: '/goods/updateCondition',
    method: 'post',
    data
  })
}
// 更新子商品
export function updateGoodsProduct(data) {
  return request({
    url: '/goods/updateProduct',
    method: 'post',
    data
  })
}
// 子商品状态
export function GoodsProductState(data) {
  return request({
    url: '/goods/deletedProduct',
    method: 'post',
    data
  })
}

// 添加子商品
export function addGoodsProduct(data) {
  return request({
    url: '/goods/addProduct',
    method: 'post',
    data
  })
}
// 新增子商品详情
export function addGoodsAttribute(data) {
  return request({
    url: '/goods/addAttribute',
    method: 'post',
    data
  })
}
// 编辑商品详情
export function updateGoodsAttribute(data) {
  return request({
    url: '/goods/updateAttribute',
    method: 'post',
    data
  })
}
// 添加收货地址
export function addGoodsAddress(data) {
  return request({
    url: '/goods/addAddress',
    method: 'post',
    data
  })
}
// 获取收货地址
export function findGoodsAddressList(data) {
  return request({
    url: '/goods/findAddressList',
    method: 'post',
    data
  })
}
// 修改收货地址
export function updateGoodsAddress(data) {
  return request({
    url: '/goods/updateAddress',
    method: 'post',
    data
  })
}
// 删除收货地址
export function delGoodsAddress(data) {
  return request({
    url: '/goods/delAddress',
    method: 'post',
    data
  })
}
// // 添加子商品参数
// export function addAttribute(data) {
//   return request({
//     url: '/goods/addAttribute',
//     method: 'post',
//     data
//   })
// }

export function deleteGoods(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

export function publishGoods(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data
  })
}

export function detailGoods(data) {
  return request({
    url: '/goods/detail',
    method: 'post',
    data
  })
}

export function editGoods(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/goods/catAndBrand',
    method: 'get'
  })
}
const uploadPath = process.env.BASE_API + '/goods/uploadImg'
export { uploadPath }
