import request from './../utils/request'

export function getNoteRecord() {
  return request({
    url: '/open/getNoteRecord',
    method: 'get'
  })
}
