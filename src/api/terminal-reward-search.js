import request from '@/utils/request'

//
export function getTimeInfo(data) {
  return request({
    url: '/net-big-data/terminal-reward-search/getTimeInfo',
    method: 'post',
    data: {
      data
    }
  })
}

export function getTypeInfo(data) {
  return request({
    url: '/net-big-data/terminal-reward-search/getTypeInfo',
    method: 'post',
    data: {
      data
    }
  })
}
