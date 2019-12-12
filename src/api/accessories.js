/**
 * @description: 产品=>配件接口
 */
import request from '@/utils/request'

export function listCategory(data) {
  return request({
    url: '/category/list',
    method: 'post',
    data
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
    method: 'post',
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

const uploadPath = process.env.BASE_API + '/category/uploadImg'
export { uploadPath }
