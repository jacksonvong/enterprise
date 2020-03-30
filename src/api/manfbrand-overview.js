import request from '@/utils/request'

//
export function getManfBrandData(data) {
  return request({
    url: '/net-big-data/manfbrand-overview/getManfBrandData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeData(data) {
  return request({
    url: '/net-big-data/manfbrand-overview/getTerminalAnalyzeData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getTerminalAnalyzeTableData(data) {
  return request({
    url: '/net-big-data/manfbrand-overview/getTerminalAnalyzeTableData',
    method: 'post',
    data: {
      data
    }
  })
}
export function saveOrder(data) {
  return request({
    url: '/net-big-data/manfbrand-overview/saveOrder',
    method: 'post',
    data: {
      data
    }
  })
}
