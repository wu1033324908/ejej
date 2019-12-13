import request from '@/utils/request'

export function listCategory(data) {
  return request({
    url: '/category/list',
    method: 'post',
    data
  })
}
export function listCategoryLv(data) {
  return request({
    url: '/category/l',
    method: 'post',
    data
  })
}

export function listCatL1() {
  return request({
    url: '/category/l1',
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: '/category/create',
    method: 'post',
    data
  })
}

export function readCategory(data) {
  return request({
    url: '/category/read',
    method: 'get',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}

export function deleteCategory(data) {
  return request({
    url: '/category/delete',
    method: 'post',
    data
  })
}
// 删除
export function deletedata(data) {
  return request({
    url: '/category/delete',
    method: 'post',
    data
  })
}
