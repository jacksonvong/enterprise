import request from '@/utils/request'

//
export function getTypeInfo(data) {
  return request({
    url: '/net-big-data/terminal-reward-search/getTypeInfo',
    method: 'post',
    data: {
      data
    }
  })
}
