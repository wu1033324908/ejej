import request from '@/utils/request'
// 订单列表
export function orderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data
  })
}
// 修改订单发货地址
export function orderUpdate(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}
// 取消订单
export function orderDelete(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data
  })
}
// 订单详情
export function orderRead(data) {
  return request({
    url: '/order/read',
    method: 'post',
    data
  })
}
