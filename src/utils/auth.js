import Cookies from 'js-cookie'
import { arr2table } from '@/utils/helper'
import store from '@/store'

const TokenKey = 'token'
const UserKey = 'user'

export function getToken() {
  const user = getUser() || {}
  return user[TokenKey] || ''
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  const value = Cookies.get(UserKey)
  return typeof value === 'string' ? JSON.parse(value) : value
}

export function setUser(user) {
  return Cookies.set(UserKey, user)
}

export function removeUser() {
  return Cookies.remove(UserKey)
}

export function auth(routes) {
  const priv = arr2table(store.getters.priv)
  const data = {}
  routes.forEach(route => {
    data[route.path] = priv.find(item => route.path === item.url)
  })
  return data
}

// 判断是否同一模块
export function modulePath(route) {
  let path = route.path
  path = path.indexOf('/zhiku/double') > -1 ? '/zhiku/car_newEnergy' : path
  if (path === '/frame' || path.indexOf('/reports-public') === 0) {
    return route.query.product || route.query.url
  }
  if (path.indexOf('zhiku') > -1 || path.indexOf('zhice') > -1) {
    return path.split('/').slice(0, 3).join('/')
  } else {
    return path.split('/').slice(0, 2).join('/')
  }
}
