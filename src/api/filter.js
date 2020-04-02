import request from '@/utils/request'

// 获取数据源列表
export function getDatasource() {
  return request({
    url: '/enterprise/common/get-data-source',
    method: 'post',
    data: {}
  })
}

// 获取起始-结束月份
export function getTimeRange(data) {
  return request({
    url: '/enterprise/common/get-min-max-time',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取厂商品牌
export function getManfbrand(data) {
  return request({
    url: '/enterprise/common/get-manfbrand',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取细分市场
export function getSegment(data) {
  return request({
    url: '/enterprise/common/get-segment',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取奖励类型
export function getReward(data) {
  return request({
    url: '/enterprise/common/get-reward',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取款型
export function getVersion(data) {
  return request({
    url: '/enterprise/common/get-version',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取车型列表
export function getSubmodel(data) {
  return request({
    url: '/enterprise/common/get-submodel',
    method: 'post',
    data: {
      data
    }
  })
}

// 查询竞争圈列表
export function getCompCircles(data) {
  return request({
    url: '/enterprise/common/get-comp-circles',
    method: 'post',
    data: {
      data
    }
  })
}

// 编辑竞争圈
export function saveCompCircle(data) {
  return request({
    url: '/enterprise/common/save-comp-circle',
    method: 'post',
    data: {
      data
    }
  })
}

// 保存浏览记录
export function saveBrowsingHistory(data) {
  return request({
    url: '/enterprise/common/save-browsing-history',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取默认的记录
export function getDefaultManfbrand(data) {
  return request({
    url: '/enterprise/common/get-default-manfbrand',
    method: 'post',
    data: {
      data
    }
  })
}

// 获取默认的记录
export function getDefaultSubmodel(data) {
  return request({
    url: '/enterprise/common/get-default-submodel',
    method: 'post',
    data: {
      data
    }
  })
}
