import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/cas-server/doLogin',
    method: 'post',
    data: { data: data }
  })
}

export function logout(token) {
  return request({
    url: '/cas-server/logout',
    method: 'post',
    data: { data: {}, token: token }
  })
}

export function getUserInfo() {
  return request({
    url: '/cas-server/info',
    method: 'get'
  })
}

export function refreshToken(params) {
  return request({
    url: '/cas-server/refreshToken',
    method: 'post',
    data: params
  })
}

export function getMenus() { // 旧菜单，拆分为以下两个接口
  return request({
    url: '/iways-front/product/product-list',
    method: 'get'
  })
}

/**
 * 菜单改版接口
 */

export function getListUserFuncs() { // 所有产品列表
  return request({
    url: '/iways-front/func/listUserFuncs',
    method: 'get'
  })
}

export function getListMenuByFunc(params) { // 单个产品菜单
  return request({
    url: '/iways-front/func/listMenuByFunc?funcId=38',
    method: 'get',
    params: params
  })
}
