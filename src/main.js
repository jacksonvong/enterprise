// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
const Vue = require('vue')
import App from './App'
import store from './store'
import router from './router'
import promise from 'es6-promise'
import * as filters from './utils/filters'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
// import './asyncRouter' // 加载路由表，开发时可先注释忽略，上线时需要打开

const IwaysUI = require('iways-ui')

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

promise.polyfill()
Vue.config.productionTip = false
Vue.use(IwaysUI, { size: 'small' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
