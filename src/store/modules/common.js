const common = {
  state: {
    condition: {},
    dataSource: [],
    dataTime: [],
    manfBrand: [],
    subModel: [],
    version: []
  },
  mutations: {
    SET_CONDITION: (state, data) => {
      state.condition = {
        ...state.condition,
        ...data
      }
    },
    SET_DATA_SOURCE: (state, data) => {
      state.dataSource = data
    },
    SET_DATA_TIME: (state, data) => {
      state.dataTime = data
    },
    SET_MANF_BRAND: (state, data) => {
      state.manfBrand = data
    },
    SET_SUB_MODEL: (state, data) => {
      state.subModel = data
    },
    SET_VERSION: (state, data) => {
      state.version = data
    }
  },
  actions: {
    setCondition({ commit }, data) {
      commit('SET_CONDITION', data)
    },
    setDataSource({ commit }, data) {
      commit('SET_DATA_SOURCE', data)
    },
    setDataTime({ commit }, data) {
      commit('SET_DATA_TIME', data)
    },
    setManfBrand({ commit }, data) {
      commit('SET_MANF_BRAND', data)
    },
    setSubModel({ commit }, data) {
      commit('SET_SUB_MODEL', data)
    },
    setVersion({ commit }, data) {
      commit('SET_VERSION', data)
    }
  }
}

export default common
