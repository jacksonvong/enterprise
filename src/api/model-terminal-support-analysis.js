import request from '@/utils/request'

//
export function getSingleModelTerminalAnalyzeData(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getSingleModelTerminalAnalyzeData',
    method: 'post',
    data: {
      data
    }
  })
}
