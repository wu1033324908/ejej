import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function listAddress(query) {
  return request({
    url: '/address/list',
    method: 'get',
    params: query
  })
}

export function listCollect(query) {
  return request({
    url: '/collect/list',
    method: 'get',
    params: query
  })
}

export function listFeedback(query) {
  return request({
    url: '/feedback/list',
    method: 'get',
    params: query
  })
}

export function listFootprint(query) {
  return request({
    url: '/footprint/list',
    method: 'get',
    params: query
  })
}

export function listHistory(query) {
  return request({
    url: '/history/list',
    method: 'get',
    params: query
  })
}
export function getUserList(data) {
  return request({
    url: '/managerUser/userList',
    method: 'post',
    data
  })
}
export function createUser(data) {
  return request({
    url: '/managerUser/addUser',
    method: 'post',
    data
  })
}
export function deleteUser(data) {
  return request({
    url: '/managerUser/delete',
    method: 'post',
    data
  })
}
export function userDetail(data) {
  return request({
    url: '/managerUser/userListOne',
    method: 'post',
    data
  })
}
export function userUpdata(data) {
  return request({
    url: '/managerUser/update',
    method: 'post',
    data
  })
}
const uploadPath = process.env.BASE_API + '/managerUser/uploadImg'
export { uploadPath }