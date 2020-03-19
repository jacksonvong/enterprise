<template>
  <div id="headerMenu" class="headermenu">
    <dl>
      <dt>
        <a href="/home"><img src="~@/assets/images/home/logo.png" alt=""></a>
      </dt>
      <dd v-if="isProductPage" class="funcTit">
        {{ options.funcName }}
      </dd>
      <dd v-else class="menuTit">
        <router-link v-for="(item, key) in menuData" :key="key" :to="item.url" class="menu-btn">
          {{ item.title }}
        </router-link>
      </dd>
    </dl>
    <div class="header-right">
      <router-link v-if="isProductPage" class="back-home" to="/">
        返回快捷入口
      </router-link>
      <a-dropdown :trigger="['click']" class="userbtn">
        <img :src="languages[language]" style="height: 20px; width: auto;" alt="">
        <a-menu slot="overlay" @click="handleSetLanguage">
          <a-menu-item key="zh_CN" :disabled="language==='zh_CN'">
            中文
          </a-menu-item>
          <a-menu-item key="en" :disabled="language==='en'">
            English
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown :trigger="['click']" :title="username" class="userbtn">
        <a class="ant-dropdown-link" href="#">
          <i class="userlogo"><em v-if="showNewMsg" class="y-news-spot" /></i>
          {{ username }} <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a href="#/base_info">基本信息</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="#/feedback_results">反馈结果</a>
          </a-menu-item>
          <a-menu-item key="3">
            <a href="#/change_password">修改密码</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="4">
            <a @click="logout()">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Dropdown, Menu, Icon, message } from 'ant-design-vue'
import store from '@/store'
import { getFeedbackData } from '@/api/index'
import zh_CN from '@/assets/images/home/language-zh.png'
import en from '@/assets/images/home/language-en.png'

export default {
  name: 'HeaderMenu',
  components: {
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    AIcon: Icon
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showNewMsg: false,
      selectedMenu: '快捷入口',
      menuData: [
        { title: '快捷入口', url: '/home' }
      ],
      username: this.$store.getters.username,
      languages: {
        zh_CN,
        en
      }
    }
  },
  computed: {
    language() {
      return this.$store.state.app.language
    },
    isProductPage() {
      return !['/home', '/information', '/home/', '/information/'].includes(this.$route.path)
    }
  },
  mounted() {
    this.getFeedbackData()
    if (this.$store.getters.addRouters['/information']) {
      this.menuData.push({
        title: '信息概览', url: '/information'
      })
    }
  },
  methods: {
    switchProduct(item) {
      this.$router.push({ path: item.url })
      this.selectedMenu = item.title
    },
    handleSetLanguage(item) {
      const lang = item.key
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      if (lang === 'zh_CN') {
        message.success('语言切换成功')
      } else if (lang === 'en') {
        message.success('Switch Language Success')
      }
      this.$emit('switchLanguage')
    },
    logout() {
      store.dispatch('LogOut').then(response => {
        // this.$router.push({ path: `/login?redirect=${this.$route.path}` })
        this.$router.push({ path: `/login` })
      })
    },
    getFeedbackData() {
      return new Promise((resolve, reject) => {
        getFeedbackData()
          .then(response => {
            const data = response.data[0] || {}
            this.showNewMsg = data > 0
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
@import '~@/assets/style/mixins';
.y-header-css{
  z-index: 9999 !important;
  top:34px !important;
  padding: 8px 0;
}
.y-news-spot{
  display:block;
  width:7px;
  height:7px;
  background: #FF555F;
  border-radius:50%;
  -webkit-border-radius:50%;
  position: absolute;
  right:0;
  top:0;
}
$height: 64px;
$bgColor: #2f5ba8;
$headermenu-zindex: 991;
$font-family: 'PingFangHK-Semibold';
.headermenu{
  @include clearfix();
  @include position(0, 0, null, 0, fixed);
  display: block;
  width: 100%;
  height: $height;
  padding: 0 20px;
  background: #2E5AA6;
  z-index: $headermenu-zindex;
  font-family: $font-family;
  dl {
    @include clearfix();
    width: calc(100% - 320px);
    float: left;
    overflow: hidden;
    height: 64px;
  }
  dt {
    @include clearfix();
    float: left;
    img {
      float: left;
    }
    span {
      @include font-adjust(20px, $height, #fff, left);
      display: inline-block;
    }
  }
  dd {
    float: left;
    &.funcTit{
      @include font-adjust(14px, $height, #fff, left);padding: 0 10px;
    }
    &.menuTit{width: calc(100% - 350px);text-align: center;}
    a{
      position: relative;
      padding: 0 24px;
      cursor: pointer;
      display: inline-block;
      @include font-adjust(14px, $height, rgba(255,255,255,0.5), left);
      &.router-link-exact-active{
        color: #fff;
      }
    }
  }
  .header-right{
    position: absolute;top: 0;right: 0;
  }
  .back-home{
    float: left;;background: rgba(255,255,255,.1);color: #fff;border-radius: 13.5px;
    width: 106px;height: 27px;line-height: 26px;text-align: center;margin: 18px 20px 0 0;
  }
  .userbtn {
    @include clearfix();@include text-hide();
    float: left;
    margin: 22px 20px 0 0;
    max-width: 160px;
    color: #fff;
    cursor: pointer;
    .el-dropdown { height: 40px; }
    .dropdown-btn { @include font-adjust(14px, $height, #fff, left); }
    .userlogo {
      position: relative;
      top: 2px;
      margin: 0 5px 0 0;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url("~@/assets/images/home/40.png") left top no-repeat;
    }
    @at-root .headermenu-dropdown {
      width: 160px;
      padding-bottom: 0;
      .line { border-top: 1px solid #eee;}
      .el-dropdown-menu__item {
        color: #181C28; font-family: $font-family;
        line-height:32px;
        padding: 0;
        a {
          color: #000;
          display: block;
          padding: 0 20px;
        }
      }
      .el-dropdown-menu__item:not(.is-disabled):hover,
      .el-dropdown-menu__item:focus { background-color: #f4f4f6; color: #181C28;}
    }
  }
}
</style>
