const axios = require('axios')
import store from '@/store'
import { getToken, getUser } from '@/utils/auth'
import { sendMail } from '@/api/index'
import moment from 'moment'
import $ from 'jquery'

import { notification } from 'ant-design-vue'

function createDescription(h, content, code = '500', error = '接口超时') {
  const id = parseInt(Math.random() * 10000)
  return h(
    'div',
    [
      h('p', content),
      h(
        'p',
        {
          attrs: {
            id: 'description-recipe-' + id,
            class: 'description-recipe hidden'
          }
        },
        '收到，将派遣专人优先处理'
      ),
      h(
        'p',
        {
          attrs: {
            id: 'description-mail-' + id,
            class: 'description-mail'
          },
          on: {
            click: () => {
              return new Promise((resolve, reject) => {
                $('#description-mail-' + id).addClass('hidden')
                $('#description-recipe-' + id).removeClass('hidden')
                sendMail({
                  content: [
                    `页面菜单：` + (store.state.app.moduleName + ' ' + window.location.hash),
                    `登录账号：${getUser()['username']}`,
                    `错误码：${code}`,
                    `错误描述：${error}`,
                    `异常时间：${moment().format('YYYY/MM/DD HH:mm:ss')}`
                  ].join('\n'), // 当前页面挂载菜单名，登录账号名，错误码，错误类型，错误时间(拼接展示在邮件名中)',
                  messageChannel: 1, // 触发渠道：1-IW PC，2-IW 移动
                  messageEvent: 3, // 消息事件：1-登录验证，2-绑定验证，3-系统监控
                  to: 'chensongde@way-s.cn'
                }).then(response => {
                  resolve(response)
                })
              })
            }
          }
        },
        '催一下！'
      )
    ]
  )
}
function enter(res) {
  notification.error({
    message: '登录已过期',
    class: 'exception-notice has-not-mail',
    description: h => {
      return createDescription(h, '系统即将退出，请重新登录', res.status ? res.status.status : res.result_code, '重登提示')
    },
    icon: (h) => {
      return <svg-icon icon-class='enter' />
    },
    onClose: () => {
      store.dispatch('FedLogOut').then(() => {
        if (parent !== window) {
          parent.location.reload()
        } else {
          location.hash = '/login'
        }
      })
    }
  })
}
function find(res) {
  notification.error({
    message: '系统遇到一点小故障',
    class: 'exception-notice',
    description: h => {
      return createDescription(h, '已通知管理员，请稍后重试', res.status ? res.status.status : res.result_code, '接口报错')
    },
    icon: (h) => {
      return <svg-icon icon-class='find' />
    }
  })
}
function wifi(res) {
  notification.error({
    message: '网络出了点小故障',
    class: 'exception-notice has-not-mail',
    description: h => {
      return createDescription(h, '已通知管理员，请稍后重试', res.status ? res.status.status : res.result_code, '接口超时')
    },
    icon: (h) => {
      return <svg-icon icon-class='wifi' />
    }
  })
}
function conf(res) {
  notification.error({
    message: '配置数据有所缺失，需维护',
    class: 'exception-notice',
    description: h => {
      return createDescription(h, '已通知管理员，请稍后重试', res.status ? res.status.status : res.result_code, '配置缺失')
    },
    icon: (h) => {
      return <svg-icon icon-class='conf' />
    }
  })
}
function redirect(hash) {
  if (parent === window) {
    // this.$router.push(hash || '/404')
  } else {
    parent.location.href = '/dashboard' + '/#' + (hash || '/404') + '?product=' + window.location.hash.replace('#', '')
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 0 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['token'] = store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      // 当请求为post的时候
      if (!config.data) config.data = { data: {}, questUID: 'string', token: '' }
      config.data['token'] = store.getters.token
    }
    if (config.url.indexOf('ajax') > -1) {
      config.baseURL = ''
    }
    config.params = config.params || {}
    config.params.t = (new Date()).valueOf()
    config.params.language = store.state.app.language
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  // response => {
  //   return response
  // },
  response => {
  // /**
  //  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  //  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  //  */
    const res = response.data
    if (res.hasOwnProperty('status')) {
      switch (res.status.status) {
        case 100440:
          store.dispatch('RefreshToken', getToken())
            .then(response => {
              // message.success('刷新Token成功')
              if (parent === window) {
                parent.location.reload()
              } else {
                location.reload()
              }
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
          break
        case 100441:
        case 100442:
        case 100443:
        case 100150:
        case 100152:
          enter(res)
          break
        case 100500:
          find(res)
          return Promise.reject(res)
        case 100406:
        case 100403:
        case 100415:
          conf(res)
          return Promise.reject(res)
      }
      return res
    }
    if (res.hasOwnProperty('result_code')) {
      switch (res.result_code) {
        case 100440:
          store.dispatch('RefreshToken', getToken())
            .then(response => {
              // message.success('刷新Token成功')
              if (parent === window) {
                parent.location.reload()
              } else {
                location.reload()
              }
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
          break
        case '408':
        case '504':
          wifi(res)
          return Promise.reject(res)
        case '403':
        case '405':
        case '406':
        case '502':
          find(res)
          return Promise.reject(res)
        case '400':
          conf(res)
          return Promise.reject(res)
        case '404':
        case '500':
          redirect('/404')
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    redirect('/404')
  }
)

export default service
