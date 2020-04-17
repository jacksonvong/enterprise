import Cookies from 'js-cookie'

const app = {
  state: {
    filter: Cookies.get('filter') || 'default',
    sidebar: {
      opened: Cookies.get('sidebarStatus') !== undefined ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    language: Cookies.get('language') || 'zh_CN',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    TOGGLE_FILTER: (state, filter) => {
      state.filter = filter
      Cookies.set('filter', filter)
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    }
  },
  actions: {
    toggleFilter({ commit }, filter) {
      commit('TOGGLE_FILTER', filter)
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
