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
export function getYearExcitationAnalyze(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getYearExcitationAnalyze',
    method: 'post',
    data: {
      data
    }
  })
}
export function getPattern(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getPattern',
    method: 'post',
    data: {
      data
    }
  })
}
export function getPie(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getPie',
    method: 'post',
    data: {
      data
    }
  })
}
