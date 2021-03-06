import request from '@/utils/request'

//
export function getTimeInfo(data) {
  return request({
    url: '/enterprise/terminal-reward-search/getTimeInfo',
    method: 'post',
    data: {
      data
    }
  })
}

export function getTypeInfo(data) {
  return request({
    url: '/enterprise/terminal-reward-search/getTypeInfo',
    method: 'post',
    data: {
      data
    }
  })
}

export function getTypeInfo2(data) {
  return request({
    url: '/enterprise/terminal-reward-search/reward-compare-list',
    method: 'post',
    data: {
      data
    }
  })
}
