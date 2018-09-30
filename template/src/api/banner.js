import request from './../utils/request'

export function getOpenBannerList() {
  return request({
    url: '/open/getOpenBannerList',
    method: 'get'
  })
}
