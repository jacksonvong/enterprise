import {
  loginByUsername,
  logout,
  refreshToken
} from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state() {
    const user = getUser()
    return {
      token: getToken(),
      ...user
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USER: (state, user) => {
      state = Object.assign(state, user)
      setUser(user)
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        async function func() {
          let user = {}
          // 信息概览页权限
          await loginByUsername(username, userInfo.password)
            .then(response => {
              const data = response.data
              if (!data) reject(response.data)
              commit('SET_TOKEN', data.token)
              // 用户信息
              user = {
                userId: data.userDTO.userId,
                username: data.userDTO.username,
                realName: data.userDTO.realName,
                companyId: data.userDTO.companyId,
                description: data.userDTO.description,
                token: data.token
              }
              commit('SET_USER', user)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        }
        func()
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_USER', '')
            commit('SET_MODULES', [])
            removeToken()
            removeUser()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
        removeToken()
        removeUser()
        resolve()
      })
    },

    RefreshToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        refreshToken({
          data: { token }
        })
          .then(response => {
            const data = response.data
            const user = getUser()
            user.token = data.token
            setUser(user)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
