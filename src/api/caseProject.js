/*
 * @Author: your name
 * @Date: 2020-03-10 16:13:50
 * @LastEditTime: 2020-03-11 15:11:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\api\caseProject.js
 */
import request from '@/utils/request'
// 案例方案列表
export function exampleDatalist(data) {
  return request({
    url: '/exampleData/list',
    method: 'post',
    data
  })
}
// 案例方案详情
export function exampleDatadetail(data) {
  return request({
    url: '/exampleData/detail',
    method: 'post',
    data
  })
}
// 案例方案  获取默认服务说明
export function getDefServiceMsg(data) {
  return request({
    url: '/exampleData/getDefServiceMsg',
    method: 'post',
    data
  })
}
// 案例方案  上架
export function exampleDataisUse(data) {
  return request({
    url: '/exampleData/isUse',
    method: 'post',
    data
  })
}
// 案例方案  下架
export function exampleDatadisable(data) {
  return request({
    url: '/exampleData/disable',
    method: 'post',
    data
  })
}
// 案例方案  通过
export function exampleDatapass(data) {
  return request({
    url: '/exampleData/pass',
    method: 'post',
    data
  })
}
// 案例方案  不通过
export function exampleDatafail(data) {
  return request({
    url: '/exampleData/fail',
    method: 'post',
    data
  })
}

// 查询方案包审核历史
export function listHistoryExampleData(data) {
  return request({
    url: '/exampleData/listHistoryExampleData',
    method: 'post',
    data
  })
}

// 方案包销售记录
export function listExampleDataOrder(data) {
  return request({
    url: '/exampleData/listExampleDataOrder',
    method: 'post',
    data
  })
}
