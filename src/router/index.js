const Vue = require('vue')
import Router from 'vue-router'
const Layout = () => import('@/components/layout/index.vue')
const Login = () => import('@/page/login/login.vue')
const Error404 = () => import('@/page/404.vue')

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '',
    component: Layout,
    children: [
      // 404页面
      { path: '/404', name: 'Error', component: Error404 }
    ]
  },
  /**
   * 1. 开发时，只需配置静态路由，与src/assets/menu.js中菜单路径一致
   * 2. 上线时，需把路由放到动态路由中，配置菜单并授予权限，路由地址和菜单路径一致
  */
  {
    path: '',
    component: Layout,
    redirect: '/enterprise',
    children: [
      { path: '/enterprise', redirect: '/enterprise/manfbrand-overview' },
      { path: '/enterprise/manfbrand-overview', component: () => import('@/page/manfbrand-overview/index.vue') },
      { path: '/enterprise/model-overview', component: () => import('@/page/model-overview/index.vue') },
      { path: '/enterprise/model-terminal-support-analysis', component: () => import('@/page/model-terminal-support-analysis/index.vue') },
      { path: '/enterprise/terminal-reward-search', component: () => import('@/page/terminal-reward-search/index.vue') },
      { path: '/enterprise/terminal-excition-search', component: () => import('@/page/terminal-excition-search/index.vue') }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
]
