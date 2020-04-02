import request from '@/utils/request'

//
export function getManfBrandData(data) {
  return request({
    url: 'enterprise/common/get-manfbrand',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeData(data) {
  return request({
    url: '/enterprise/manfbrand-overview/getTerminalAnalyzeData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeTableData(data) {
  return request({
    url: '/enterprise/manfbrand-overview/getTerminalAnalyzeTableData',
    method: 'post',
    data: {
      data
    }
  })
}
export function saveOrder(data) {
  return request({
    url: '/enterprise/manfbrand-overview/saveOrder',
    method: 'post',
    data: {
      data
    }
  })
}
