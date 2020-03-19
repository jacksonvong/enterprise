import request from '@/utils/request'

export function checkHealth() { // 检查接口是否健康
  return request({
    url: '/new-car/health',
    method: 'get'
  })
}

export function sendMail(params) {
  return request({
    url: '/message/message/sendError',
    method: 'post',
    data: {
      data: params
    }
  })
}

export function getListFuncs(params) { // 加载游客产品树(免登陆)
  return request({
    url: '/iways-front/func/listFuncs',
    method: 'get',
    params: params
  })
}

export function getListFuncsByGroup(params) { // 根据产品组Id查询子组和子产品(申请试用菜单树可用)
  return request({
    url: '/iways-front/func/listFuncsByGroup',
    method: 'get',
    params: params
  })
}

export function getOftenUse(params) { // 获取用户经常访问的产品
  return request({
    url: '/iways-front/func/offenUseFunc',
    method: 'get',
    params: params
  })
}

export function getVisitFunc(params) { // 登记用户访问应用
  return request({
    url: '/iways-front/func/visitFunc',
    method: 'post',
    params: params
  })
}

export function getADTForApp(params) { // 查询广告
  return request({
    url: '/app-config/adt/app/getADTForApp',
    method: 'post',
    data: params
  })
}

export function getApplyForTrial(params) {
  return request({
    url: '/iways-front/apply/applyForTrial',
    method: 'get',
    params: params
  })
}

export function getApplyUserInfo(params) {
  return request({
    url: '/iways-front/apply/getUserBaseInfo',
    method: 'get',
    params: params
  })
}

export function getFeedbackData() {
  return request({
    url: '/iways-front/freeback/getUnreadCount',
    method: 'get'
  })
}

export function putChangePassword(params) {
  return request({
    url: '/iways-front/user/password',
    method: 'put',
    data: params
  })
}

export function getFreebackResultForUser(params) { // 反馈结果
  return request({
    url: '/iways-front/freeback/freebackResultForUser',
    method: 'get',
    params: params
  })
}

export function getIndexPermission(params) { // 信息概要权限
  return request({
    url: '/iways-front/func/getIndexPermission',
    method: 'get',
    params: params
  })
}
