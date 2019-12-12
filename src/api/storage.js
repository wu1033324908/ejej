/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 14:46:41
 * @LastEditTime: 2019-08-13 11:21:51
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'

export function listStorage(query) {
  return request({
    url: '/storage/list',
    method: 'get',
    params: query
  })
}

export function createStorage(data) {
  return request({
    url: '/storage/create',
    method: 'post',
    data,
    isVersion: true
  })
}

export function createTestStorage(data) {
  return request({
    url: '/storage/createTest',
    method: 'post',
    data
  })
}

export function readStorage(data) {
  return request({
    url: '/storage/read',
    method: 'get',
    data
  })
}

export function updateStorage(data) {
  return request({
    url: '/storage/update',
    method: 'post',
    data
  })
}

export function deleteStorage(data) {
  return request({
    url: '/storage/delete',
    method: 'post',
    data
  })
}

const uploadPath = process.env.BASE_API + '/storage/create'
export { uploadPath }
