<template>
  <div :class="[statusClass, isItsOwn ? '' : 'in-frame']" class="mainpart iways">
    <!-- 头部菜单 -->
    <component :is="HeaderMenu" ref="headerMenuId" :options="product" @switchLanguage="switchLanguage" />

    <!-- 左侧菜单 -->
    <component :is="LeftMenu" v-show="product" :options="product" @controlParentPanel="controlPanel" />

    <!-- 主体 -->
    <div class="main-panel">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive&&isPageAlive" class="conten-entry" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive&&isPageAlive" class="conten-entry" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import HeaderMenu from '@/components/layout/header-menu.vue'
import LeftMenu from '@/components/layout/left-menu.vue'
import { modulePath } from '@/utils/auth'
import menu from '@/assets/data/menu'
function checkIE() {
  return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
}

export default {
  name: 'App',
  components: {
    HeaderMenu, LeftMenu
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      statusClass: 'leftmenu-expand',
      funcId: this.$route.query.funcId || '',
      product: {},
      LeftMenu: false,
      HeaderMenu: false,
      isPageAlive: true
    }
  },
  computed: {
    isItsOwn() {
      return (parent === window)
    }
  },
  watch: {
    '$route': function(to, from) {
      this.init(to)
      this.handleRouteChange(to, from)
    }
  },
  mounted() {
    if (this.isItsOwn) {
      this.HeaderMenu = 'HeaderMenu'
      this.LeftMenu = 'LeftMenu'
    }
    this.init(this.$route)

    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
      this.$router.push(this.$route.path)
    }
  },
  methods: {
    init(to) {
      // 注册LeftMenu
      if (['/information', '/change_password', '/feedback_results', '/frame', '/404'].includes(to.path)) {
        this.leftMenu = false
        this.statusClass = ''
        if (to.query.product) { // 嵌入智库模块
          const key = modulePath(to)
          this.leftMenu = 'LeftMenu'
          this.statusClass = 'leftmenu-expand'
          this.product = this.$store.getters.addRouters[key]
        } else {
          const key = modulePath(to).replace('&isIways=true', '')
          this.product = this.$store.getters.addRouters[key]
        }
      } else {
        this.leftMenu = 'LeftMenu'
        this.product = this.$store.getters.menus[0] || menu[0] // 测试
      }
    },
    switchLanguage() {
      // 重载内容
      this.reload()
      // 重新请求菜单
      this.$store.dispatch('GetMenus').then(res => {
        const menus = res.data
        this.$store.dispatch('GenerateRoutes', { menus }).then(() => {
          this.init(this.$route)
        })
      })
    },
    reload() {
      this.isPageAlive = false
      this.$nextTick(() => {
        this.isPageAlive = true
      })
    },
    controlPanel(status) {
      this.statusClass = status ? 'leftmenu-expand' : ''
    },
    handleRouteChange(to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      if (to.path !== from.path) {
        if (parent !== window) {
          try {
            parent.location.href = parent.location.href.split('#')[0] + '#' + to.path
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.main-panel {margin-top: 64px;}
.conten-entry { position: relative; }
.leftmenu-expand .main-panel{padding-left: 200px;}
.in-frame {
  .main-panel {
    margin-top: 0px;
    padding-left: 0px;
  }
}
</style>
