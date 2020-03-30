import request from '@/utils/request'

//
export function getSegmentData(data) {
  return request({
    url: '/net-big-data/model-overview/getSegmentData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getSubModelData(data) {
  return request({
    url: '/net-big-data/model-overview/getSubModelData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeData(data) {
  return request({
    url: '/net-big-data/model-overview/getTerminalAnalyzeData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeTableData(data) {
  return request({
    url: '/net-big-data/model-overview/getTerminalAnalyzeTableData',
    method: 'post',
    data: {
      data
    }
  })
}
export function saveOrder(data) {
  return request({
    url: '/net-big-data/model-overview/saveOrder',
    method: 'post',
    data: {
      data
    }
  })
}
