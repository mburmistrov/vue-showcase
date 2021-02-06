import Vuex from 'vuex'
import { isDateAfter } from '@/utils/date'

let store = null

export const storeConfig = Object.freeze({
  state: {
    currentUser: null
  },
  getters: {
    licenseValidUntil: (state) => {
      if (!state.currentUser) return null
      return state.currentUser.licenseValidUntil
    },
    hasValidLicense: (state, getters) => {
      if (!getters.licenseValidUntil) return false
      return isDateAfter(getters.licenseValidUntil, new Date())
    },
    isDemo: (state, getters) => {
      return !getters.hasValidLicense
    }
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    }
  }
})

export function createStore() {
  store = store || new Vuex.Store(storeConfig)
  return store
}
