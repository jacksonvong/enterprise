import request from '@/utils/request'

//
export function getMoney(data) {
  return request({
    url: '/enterprise/terminal-excition-search/getMoney',
    method: 'post',
    data: {
      data
    }
  })
}
