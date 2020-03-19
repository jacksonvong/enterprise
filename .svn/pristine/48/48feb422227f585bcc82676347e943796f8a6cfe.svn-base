const queryParams = {
  state: {
    region: [],
    dimensionId: '',
    dimensionName: '',
    areaId: '',
    dataSourceId: '',
    ym: '',
    subModelId: '',
    subModelName: '',
    manfId: '',
    manfName: '',
    jpId: []
  },
  mutations: {
    SET_DIMENSIONID: (state, dimensionId) => {
      state.dimensionId = dimensionId
    },
    SET_DIMENSIONNAME: (state, dimensionName) => {
      state.dimensionName = dimensionName
    },
    SET_AREAID: (state, areaId) => {
      state.areaId = areaId
    },
    SET_DATASOURCEID: (state, dataSourceId) => {
      state.dataSourceId = dataSourceId
    },
    SET_YM: (state, ym) => {
      state.ym = ym
    },
    SET_SUBMODELID: (state, subModelId) => {
      state.subModelId = subModelId
    },
    SET_SUBMODELNAME: (state, subModelName) => {
      state.subModelName = subModelName
    },
    SET_MANFID: (state, manfId) => {
      state.manfId = manfId
    },
    SET_MANFNAME: (state, manfName) => {
      state.manfName = manfName
    },
    SET_JPID: (state, jpId) => {
      state.jpId = jpId
    },
    SET_REGION: (state, region) => {
      state.region = region
    }
  },
  actions: {
    update({ commit }, queryParams) {
      const {
        dimensionId,
        dimensionName,
        areaId,
        dataSourceId,
        ym,
        subModelId,
        subModelName,
        manfId,
        manfName,
        jpId,
        region
      } = queryParams
      commit('SET_DIMENSIONID', dimensionId)
      commit('SET_DIMENSIONNAME', dimensionName)
      commit('SET_AREAID', areaId)
      commit('SET_DATASOURCEID', dataSourceId)
      commit('SET_YM', ym)
      commit('SET_SUBMODELID', subModelId)
      commit('SET_SUBMODELNAME', subModelName)
      commit('SET_MANFID', manfId)
      commit('SET_MANFNAME', manfName)
      commit('SET_JPID', jpId)
      commit('SET_REGION', region)
    },
    setDimensionId({ commit }, dimensionId) {
      commit('SET_DIMENSIONID', dimensionId)
    }
  }
}

export default queryParams
