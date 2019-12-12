import request from '@/utils/request'
export function getDropDown(data) {
  return request({
    url: '/kv/getComboBox',
    method: 'post',
    data
  })
}
