/**
 * @description: 产品=>配件配置键值对接口
 */
import request from '@/utils/request'

export function keyValList(data) {
  return request({
    url: '/admin/kv/list',
    method: 'post',
    data
  })
}
