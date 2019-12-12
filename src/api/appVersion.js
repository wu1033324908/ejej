/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 10:16:04
 * @LastEditTime: 2019-08-16 12:02:29
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: app管理 => app版本管理
 */
import request from '@/utils/request'

export function getUpdateList(data) {
  return request({
    url: '/update/getUpdateList',
    method: 'post',
    data
  })
}

export function getUpdateSave(data) {
  return request({
    url: '/update/save',
    method: 'post',
    data
  })
}

const uploadPath = process.env.BASE_API + '/update/uploadImg'
export { uploadPath }
