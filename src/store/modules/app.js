import Cookies from 'js-cookie'

const app = {
  state: {
    /** ---------------------------------------公共参数用到的字段--------------------------------------- */
    dimension: null,
    dataSource: null,
    dataTimeType: null,
    dataTime: null,
    dataTime2: null,
    subModel: null,
    manfBrand: null,
    commonParamsLoading: true,
    filter: Cookies.get('filter') || 'default',
    /** --------------------------------------------------------------------------------------------- */
    activeMarketId: null,
    moduleName: Cookies.get('moduleName') || '',
    sidebar: {
      opened: Cookies.get('sidebarStatus') !== undefined ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh_CN',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    SET_DIMENSION: (state, dimension) => {
      state.dimension = dimension
    },
    SET_DATASOURCE: (state, dataSource) => {
      state.dataSource = dataSource
    },
    SET_DATATIMETYPE: (state, dataTimeType) => {
      state.dataTimeType = dataTimeType
    },
    SET_DATATIME: (state, dataTime) => {
      state.dataTime = dataTime
    },
    SET_DATATIME2: (state, dataTime2) => {
      state.dataTime2 = dataTime2
    },
    SET_SUBMODEL: (state, subModel) => {
      state.subModel = subModel
    },
    SET_MANFBRAND: (state, manfBrand) => {
      state.manfBrand = manfBrand
    },
    SET_COMMONPARAMS_LOADING: (state, status) => {
      state.commonParamsLoading = status
    },
    TOGGLE_FILTER: (state, filter) => {
      state.filter = filter
      Cookies.set('filter', filter)
    },
    SET_ACTICEMAKKETID: (state, id) => {
      state.activeMarketId = id
    },
    SET_MODULENAME: (state, moduleName) => {
      state.moduleName = moduleName
      Cookies.set('moduleName', moduleName)
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
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
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
    setDimension({ commit }, dimension) {
      commit('SET_DIMENSION', dimension)
    },
    setDataSource({ commit }, dataSource) {
      commit('SET_DATASOURCE', dataSource)
    },
    setDataTimeType({ commit }, dataTimeType) {
      commit('SET_DATATIMETYPE', dataTimeType)
    },
    setDataTime({ commit }, dataTime) {
      commit('SET_DATATIME', dataTime)
    },
    setDataTime2({ commit }, dataTime2) {
      commit('SET_DATATIME2', dataTime2)
    },
    setSubModel({ commit }, subModel) {
      commit('SET_SUBMODEL', subModel)
    },
    setManfBrand({ commit }, manfBrand) {
      commit('SET_MANFBRAND', manfBrand)
    },
    changeCommonParamsLoading({ commit }, status) {
      commit('SET_COMMONPARAMS_LOADING', status)
    },
    toggleFilter({ commit }, filter) {
      commit('TOGGLE_FILTER', filter)
    },
    changeActiveMarketTab({ commit }, id) {
      commit('SET_ACTICEMAKKETID', id)
    },
    setModuleName({ commit }, moduleName) {
      commit('SET_MODULENAME', moduleName)
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
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
