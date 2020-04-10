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
export function getAllExcitationAnalyze(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getAllExcitationAnalyze',
    method: 'post',
    data: {
      data
    }
  })
}
