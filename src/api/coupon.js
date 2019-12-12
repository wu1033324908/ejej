/*
 * @Author: your name
 * @Date: 2019-12-06 11:41:12
 * @LastEditTime: 2019-12-09 12:49:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\coupon.js
 */
import request from '@/utils/request'
// 上架下架
export function isUser(data) {
  return request({
    url: '/coupon/isUser',
    method: 'post',
    data
  })
}
// 优惠券列表
export function getCouponList(data) {
  return request({
    url: '/coupon/list',
    method: 'post',
    data
  })
}
// 新增优惠券
export function create(data) {
  return request({
    url: '/coupon/create',
    method: 'post',
    data
  })
}
// 删除优惠券
export function couponDelete(data) {
  return request({
    url: '/coupon/delete',
    method: 'post',
    data
  })
}

// 优惠券规则列表
export function couponRuleList(data) {
  return request({
    url: '/couponRule/list',
    method: 'post',
    data
  })
}
// 新增优惠券规则
export function couponRuleCreate(data) {
  return request({
    url: '/couponRule/create',
    method: 'post',
    data
  })
}
// 编辑优惠券规则
export function couponRuleUpdate(data) {
  return request({
    url: '/couponRule/update',
    method: 'post',
    data
  })
}
