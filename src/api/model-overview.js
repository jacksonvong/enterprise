import request from '@/utils/request'

//
export function getSegmentData(data) {
  return request({
    url: '/enterprise/model-overview/getSegmentData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getSubModelData(data) {
  return request({
    url: '/enterprise/common/get-submodel',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeData(data) {
  return request({
    url: '/enterprise/model-overview/getTerminalAnalyzeData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeTableData(data) {
  return request({
    url: '/enterprise/model-overview/getTerminalAnalyzeTableData',
    method: 'post',
    data: {
      data
    }
  })
}
export function saveOrder(data) {
  return request({
    url: '/enterprise/model-overview/saveOrder',
    method: 'post',
    data: {
      data
    }
  })
}
