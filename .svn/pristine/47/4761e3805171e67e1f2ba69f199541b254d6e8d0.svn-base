import { arr2table, menusFormatter, copyObject } from '@/utils/helper'
import { getListMenuByFunc } from '@/api/login'
import { checkApiHealth } from '@/utils/mixin'
import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过route.path判断是否存在于菜单表
 * @param menus
 * @param route
 */
function exsitInMenus(menus, route) {
  if (route.path) {
    return menus.some(menu => route.path.includes(menu.url))
  } else {
    return true
  }
}

/**
 * 通过menu.url判断是否存在于路由表
 * @param menus
 * @param route
 */
function exsitInRouters(routers, menu) {
  if (menu.url) {
    return routers.some(router => menu.url === router.path)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (exsitInMenus(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 递归过滤非法的异步菜单，返回符合用户角色权限的菜单表
 */
function filterMenus(menus, routers) {
  const data = []
  for (const i in menus) {
    const menu = menus[i]
    /* if (menu.isProduct === 1 && menu.purchaseStatus === 0) continue */
    if (/* menu.isProduct !== 1 && */menu.isMenu === 0) continue
    let children = []
    if (!!menu.children && menu.children.length > 0) {
      children = filterMenus(menu.children, routers)
    } else {
      if (exsitInRouters(routers, menu)) {
        data.push(menu)
      }
    }
    if (children.length > 0) {
      menu.children = children
      data.push(menu)
    }
  }
  return data
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    menus: [],
    priv: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_PRIV: (state, priv) => {
      state.priv = priv
    }
  },
  actions: {

    GetMenus({ commit, state }) {
      return new Promise((resolve, reject) => {
        async function func() {
          await checkApiHealth()
          // 访问模块列表
          getListMenuByFunc(state.token)
            .then(response => {
            // 由于mockjs 不支持自定义状态码只能这样hack
              if (!response.data) {
                reject('Verification failed, please login again.')
              }
              const data = response.data
              if (data && data.length > 0) {
                commit('SET_PRIV', copyObject(data))
              // 验证返回的menus是否是一个非空数组
              } else {
                reject('getMenus: menus must be a non-null array!')
              }

              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        }
        func()
      })
    },

    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { menus } = data
        // 注册动态路由表
        const accessedRouters = filterAsyncRouter(asyncRouterMap, arr2table(menusFormatter(menus)))
        commit('SET_ROUTERS', accessedRouters)
        // 生成左侧菜单
        const localRouters = arr2table(constantRouterMap.concat(accessedRouters))
        const menuRouters = filterMenus(menus, localRouters)
        if (menuRouters.length > 0) {
          commit('SET_MENUS', menuRouters)
          resolve()
        } else {
          reject('no permission')
        }
      })
    }
  }
}

export default permission
