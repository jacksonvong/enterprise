import request from '@/utils/request'

//
export function getMoney(data) {
  return request({
    url: '/net-big-data/terminal-excition-search/getMoney',
    method: 'post',
    data: {
      data
    }
  })
}
