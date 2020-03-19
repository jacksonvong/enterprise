import Cookies from 'js-cookie'
import { get } from 'lodash'

const app = {
  state: {
    dimensionDataSource: [],
    region: get(JSON.parse(Cookies.get('dimensionStatus') || '{}'), 'region', [-1]),
    dimension: get(JSON.parse(Cookies.get('dimensionStatus') || '{}'), 'dimension', 0),
    dimensionName: get(JSON.parse(Cookies.get('dimensionStatus') || '{}'), 'dimensionName', '全国'),
    commonParamsLoading: true,
    activeMarketId: null,
    dataSource: undefined,
    dataTime: undefined,
    subModel: undefined,
    manfBrand: undefined,
    moduleName: Cookies.get('moduleName') || '',
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    filter: Cookies.get('filter') || 'default',
    language: Cookies.get('language') || 'zh_CN',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    SET_DIMENSION_DATASOURCE: (state, dimensionDataSource) => {
      state.dimensionDataSource = dimensionDataSource
    },
    SET_DIMENSION_STATUS: (state, status) => {
      state.region = status.region
      state.dimension = status.dimension
      state.dimensionName = status.dimensionName
      Cookies.set('dimensionStatus', status)
    },
    SET_COMMONPARAMS_LOADING: (state, status) => {
      state.commonParamsLoading = status
    },
    SET_ACTICEMAKKETID: (state, id) => {
      state.activeMarketId = id
    },
    SET_MODULENAME: (state, moduleName) => {
      state.moduleName = moduleName
      Cookies.set('moduleName', moduleName)
    },
    SET_DATASOURCE: (state, dataSource) => {
      state.dataSource = dataSource
    },
    SET_DATATIME: (state, dataTime) => {
      state.dataTime = dataTime
    },
    SET_SUBMODEL: (state, subModel) => {
      state.subModel = subModel
    },
    SET_MANFBRAND: (state, manfBrand) => {
      state.manfBrand = manfBrand
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
    TOGGLE_FILTER: (state, filter) => {
      state.filter = filter
      Cookies.set('filter', filter)
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
    setDimensionDatasource({ commit }, dimensionDataSource) {
      commit('SET_DIMENSION_DATASOURCE', dimensionDataSource)
    },
    changeDimensionStatus({ commit }, status) {
      commit('SET_DIMENSION_STATUS', status)
    },
    changeCommonParamsLoading({ commit }, status) {
      commit('SET_COMMONPARAMS_LOADING', status)
    },
    changeActiveMarketTab({ commit }, id) {
      commit('SET_ACTICEMAKKETID', id)
    },
    setModuleName({ commit }, moduleName) {
      commit('SET_MODULENAME', moduleName)
    },
    setDataSource({ commit }, dataSource) {
      commit('SET_DATASOURCE', dataSource)
    },
    setDataTime({ commit }, dataTime) {
      commit('SET_DATATIME', dataTime)
    },
    setSubModel({ commit }, subModel) {
      commit('SET_SUBMODEL', subModel)
    },
    setManfBrand({ commit }, manfBrand) {
      commit('SET_MANFBRAND', manfBrand)
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
    toggleFilter({ commit }, filter) {
      commit('TOGGLE_FILTER', filter)
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
