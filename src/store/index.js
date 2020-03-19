const Vue = require('vue')
import Vuex from 'vuex'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import app from './modules/app'
import user from './modules/user'
import queryParams from './modules/queryParams'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    errorLog,
    permission,
    app,
    user,
    queryParams
  },
  getters,
  plugins: debug ? [createLogger()] : []
})

export default store
