import request from './../utils/request'

export function getBettingList(query) {
  return request({
    url: '/open/getBettingList',
    method: 'get',
    params: query
  })
}

export function getArticleList(query) {
  return request({
    url: '/open/getArticleList',
    method: 'get',
    params: query
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/open/getArticleDetail',
    method: 'get',
    params: { id }
  })
}
