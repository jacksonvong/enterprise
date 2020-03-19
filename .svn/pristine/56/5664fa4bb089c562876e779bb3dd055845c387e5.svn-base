import store from '@/store'
import { notification } from 'ant-design-vue'
import { checkHealth, sendMail } from '@/api/index'
import { getUser } from '@/utils/auth'
import moment from 'moment'
import $ from 'jquery'

export function checkApiHealth() {
  return new Promise((resolve, reject) => {
    checkHealth().then(response => {
      if (response && response.status === 'UP') {
        resolve(response)
      } else {
        notification.error({
          message: '网络出了点小故障',
          class: 'exception-notice has-not-mail',
          description: (h) => {
            const id = parseInt(Math.random() * 10000)
            return h(
              'div',
              [
                h('p', '已通知管理员，请稍后重试'),
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
                              `错误码：500`,
                              `错误描述：接口超时`,
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
          },
          icon: (h) => {
            return <svg-icon icon-class='wifi' />
          }
        })
        reject(response)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
