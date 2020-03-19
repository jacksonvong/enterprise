<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import { LocaleProvider } from 'ant-design-vue'
export default {
  name: 'App',
  components: {
    ALocaleProvider: LocaleProvider
  },
  data() {
    return {
      locale: this.$i18n.messages[this.$store.state.app.language]
    }
  },
  created() {
    this.locale = this.$i18n.messages[this.$store.state.app.language]
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app {
  background: #f7f7f7;
  min-width: 1000px;
  overflow: auto;
}
</style>

<style lang="less">
@import '~@/assets/style/base';
@import '~@/assets/style/public';
</style>
