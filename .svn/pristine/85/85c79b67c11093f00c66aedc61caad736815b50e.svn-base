<template>
  <a-spin :spinning="spinning">
    <div :style="{height: windowHeight + 'px'}" class="login">
      <div class="operating">
        <div class="header">
          <template v-if="appear&&false">
            <span class="sanjiao" />
            <a class="left" href="/trial">
              申请试用
            </a>
            <span class="banyuan" />
          </template>
          <a v-if="appear&&false" class="right" href="/home">
            回到首页
          </a>
        </div>
        <div class="achieves">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleLogin"
          >
            <div class="title-container">
              <!-- <h3 class="title">
                    {{ $t('login.title') }}
                  </h3> -->
              <lang-select v-if="false" class="set-language" />
            </div>
            <a-form-item>
              <a-input
                v-decorator="[
                  'username',
                  { rules: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 1, max: 100, message: '请输入正确的账号名称', trigger: 'blur' }
                  ] }
                ]"
                :placeholder="$t('login.username')"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码', trigger: 'blur' }] }
                ]"
                :placeholder="$t('login.password')"
                type="password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item class="button">
              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                {{ $t('login.logIn') }}
              </a-button>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  }
                ]"
              >
                {{ $t('login.rememberMe') }}
              </a-checkbox>
              <a-tooltip placement="bottom">
                <div slot="title">
                  <div class="header">
                    请选择以下方式联系我们修改密码
                  </div>
                  <div class="box">
                    <p>电话</p>
                    <div class="phone_content">
                      020 - 83912326 - 8249
                    </div>
                    <div class="left">
                      <p>手机</p>
                      <div class="tel">
                        188 1411 8557
                      </div>
                    </div>
                    <div class="right">
                      <p>邮箱</p>
                      <div class="email">
                        cs@way-s.cn
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  class="login-form-forgot"
                  href="javascript:void(0);"
                >
                  {{ $t('login.ForgotPassword') }}
                </a>
              </a-tooltip>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="false" class="bottom">
        <ul>
          <li>
            <router-link to="/">
              官网首页/
            </router-link>
          </li>
          <li>
            <router-link to="/">
              智库/
            </router-link>
          </li>
          <li>
            <router-link to="/">
              智策/
            </router-link>
          </li>
          <li>
            <router-link to="/">
              达示数据/
            </router-link>
          </li>
          <li>
            <router-link to="/">
              加入我们
            </router-link>
          </li>
        </ul>
        <p class="copyright">
          Copyright © 2009-{{ thisYear }} 广州威尔森信息科技有限公司  All rights reserved
        </p>
        <p class="copyLast">
          粤ICP09206296号-1
        </p>
      </div>
    </div>
  </a-spin>
</template>

<script type="text/ecmascript-6">
import { Button, Form, Input, Icon, Checkbox, Tooltip, Spin, message } from 'ant-design-vue'
// import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Login',
  components: {
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AIcon: Icon,
    ACheckbox: Checkbox,
    ATooltip: Tooltip,
    ASpin: Spin,
    LangSelect
  },
  // metaInfo() {
  //   return {
  //     title: '威尔森智能决策平台',
  //     link: [{
  //       rel: 'shortcut icon',
  //       href: '/static/images/favicon.ico',
  //       type: 'image/x-icon'
  //     }]
  //   }
  // },
  data() {
    return {
    //   loading: false,
      appear: false,
      //   login_type: 1,
      //   loginForm: {
      //     username: '',
      //     password: ''
      //     //        remember: false,
      //   },
      //   rediect_url: '',
      //   rules: {
      //     username: [
      //       { required: true, message: '请输入账号', trigger: 'blur' },
      //       { min: 1, max: 30, message: '请输入正确的账号名称', trigger: 'blur' }
      //     ],
      //     password: [
      //       { required: true, message: '请输入密码', trigger: 'blur' }
      //       // { min: 4, max: 23, message: '长度在 4 到 23 个字符', trigger: 'blur' },
      //       // { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_\.\@]{4,23}$/, message: '密码需由数字和字母组合', trigger: 'blur' },
      //     ]
      //   }
      spinning: false,
      windowHeight: document.documentElement.clientHeight || document.body.clientHeight,
      thisYear: (new Date()).getFullYear()
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  mounted() {
    // var that = this
    this.rediect_url = this.$route.query.service
    this.appear = this.rediect_url ? this.rediect_url.indexOf('waysdata') === -1 : true
    // that.$refs['account'].focus() // 默认第一个input获取焦点
  },
  methods: {
    // ...mapActions([USER_SIGNIN, USER_MENUS, USER_PRODUCTS]),
    handleLogin(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.spinning = true
          this.$store.dispatch('LoginByUsername', values)
            .then((response) => {
              const data = response.data || {}
              this.spinning = false
              // 登录兼容
              const rediect_url = data.service
              if (rediect_url.indexOf('i.ways.cn') !== -1 ||
                rediect_url.indexOf('i.way-s.cn') !== -1
              ) {
                message.success('欢迎登录威尔森智能决策平台')
                this.$router.push({ path: this.redirect || '/' })
              } else {
                message.success('欢迎登录智库平台')
                window.location.href = rediect_url + '?token=' + this.token
              }
            }).catch((response) => {
              message.error(response.status.msg2Client)
              this.spinning = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import '~@/assets/style/mixins';

.login {
  min-width: 1200px;
  background: url("~@/assets/images/login/BG.jpg") repeat-x bottom;
  background-color: #ccc;
  min-height: 720px; min-width: 1200px;
  .operating {
    @include box-Module(block, 396px, 536px, 0 0, null, #fff, null);
    border-radius: 4px;
    float: right;  position: absolute;right: 10%;top: 10%; z-index: 1;
    .header{
      background: url("~@/assets/images/login/LOGO1.png"); background-repeat:no-repeat;background-position:center;
      background-color: #F7F7FF;
      width: 100%;height: 212px;
      .sanjiao{
          display:block;
          width:0;
          height:0;
          border-width:5px 5px 5px 0;
          border-style:solid;
          border-color:transparent #fff transparent transparent;/*透明 黄 透明 透明 */
          position:absolute;
          top:22px;
          left:8px;
          z-index: 2;
      }
      .left{
          display: block;
          background: #2E5AA6;
          position: absolute;
          top:16px;
          left:0px;
          color:#fff;
          height: 24px;
          line-height: 24px;
          width: 65px;
          font-size: 12px;
          text-align: right;
          z-index: 1;
      }
      .banyuan{
          height: 24px;
          width: 24px;
          position: absolute;
          top:16px;
          left:53px;
          border-radius: 50%;
          background:#2E5AA6;
      }
      .right{
        font-size: 12px;
        color: #2E5AA6;
        text-align: right;
        line-height: 12px;
        position: absolute;
        top:16px;
        right:24px;
      }
    }
    .achieves {
      padding: 0 48px;
      a{
        float: right; font-size: 14px; color:#2E5BA6 ;
        &:hover{text-decoration: underline}
      }
      .login-form{
        .title-container {
          position: relative; height: 30px;
          .set-language {
            position: absolute;
            top: 3px;
            font-size: 18px;
            right: 0;
            cursor: pointer;
          }
        }
        .ant-input-affix-wrapper {
          height: 40px;
          .ant-input {
            border:none;
            border-bottom: 1px solid #ccc;
          }
        }
        .button{padding-top:28px}
        button{background-color:#2E5AA6;border-color: #2E5AA6;height: 44px;}
        .disabled{background-color:#C0CDE4 ;border-color: #C0CDE4 ;}
        .el-form-item__error{top: 8px;left:160px;width: 140px;text-align: right;}
      }
    }
  }
  .bottom{ position: absolute; left: 0; right: 0; bottom: 40px; min-width: 1200px;
    ul{
      text-align: center;
      width: 100%;
      li{
        display: inline-block;
        a{
          color:#fff;
          font-size: 14px;
        }
      }
    }
    .copyright{@include font-adjust(14px, 30px, #fff, center, null);}
    .copyLast{@include font-adjust(14px, 30px, #fff, center, null);}
  }
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
