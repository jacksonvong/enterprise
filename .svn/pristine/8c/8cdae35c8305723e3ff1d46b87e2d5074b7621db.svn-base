const Vue = require('vue')
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import antDesignZhLocale from 'ant-design-vue/lib/locale-provider/zh_CN'// ant-design-vue lang
import antDesignEnLocale from 'ant-design-vue/lib/locale-provider/en_US'// ant-design-vue lang
import zhLocale from './zh'
import enLocale from './en'
const iwaysUiZhLocale = global.IwaysUi.lang.zhCN
const iwaysUiEnLocale = global.IwaysUi.lang.en
const IwaysUI = require('iways-ui')

Vue.use(VueI18n)

const messages = {
  'zh_CN': {
    ...zhLocale,
    ...iwaysUiZhLocale,
    ...antDesignZhLocale
  },
  'en': {
    ...enLocale,
    ...iwaysUiEnLocale,
    ...antDesignEnLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh_CN | es
  locale: Cookies.get('language') || 'zh_CN',
  // set locale messages
  messages
})
IwaysUI.i18n((key, value) => i18n.t(key, value))

export default i18n
