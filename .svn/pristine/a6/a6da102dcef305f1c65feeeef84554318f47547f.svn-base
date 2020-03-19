<template>
  <a-dropdown :trigger="['click']">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <a-menu slot="overlay" @click="handleSetLanguage">
      <a-menu-item key="zh_CN" :disabled="language==='zh_CN'">
        中文
      </a-menu-item>
      <a-menu-item key="en" :disabled="language==='en'">
        English
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { Dropdown, Menu, message } from 'ant-design-vue'

export default {
  components: {
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(item) {
      const lang = item.key
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      message.success('Switch Language Success')
    }
  }
}
</script>
