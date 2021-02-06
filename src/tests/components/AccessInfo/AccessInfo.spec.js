import { shallowMount, createLocalVue } from '@vue/test-utils'
import AccessInfo from '@/components/AccessInfo/AccessInfo'
import AccessInfoDescription from '@/components/AccessInfo/components/AccessInfoDescription'
import { merge } from 'lodash'
import Vuex from 'vuex'
import { storeConfig } from '@/store'
import { getUser, withValidLicense, withExpiredLicense, withoutLicense, withLicenseValidUntil } from '@/tests/utils/getUser'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStore(overrides) {
  const defaultStoreConfig = {
    state: {
      currentUser: getUser([withValidLicense])
    },
    getters: storeConfig.getters
  }
  return new Vuex.Store(
    merge(defaultStoreConfig, overrides)
  )
}

describe('AccessInfo', () => {
  function createWrapper(overrides) {
    const defaultMountingOptions = {
      localVue,
      store: createStore()
    }

    return shallowMount(AccessInfo, merge(defaultMountingOptions, overrides))
  }

  function createWrapperWithCurrentUser(user) {
    const store = createStore({
      state: {
        currentUser: user
      }
    })
    return createWrapper({ store })
  }

  describe('template', () => {
    describe('demo class', () => {
      const className = 'access-info--demo'

      it('should be present if user has no license', () => {
        const wrapper = createWrapperWithCurrentUser(getUser([withoutLicense]))
        expect(wrapper.classes()).toContain(className)
      })

      it('should be present if user has expired license', () => {
        const wrapper = createWrapperWithCurrentUser(getUser([withExpiredLicense]))
        expect(wrapper.classes()).toContain(className)
      })

      it('should not be present if user has valid license', () => {
        const wrapper = createWrapperWithCurrentUser(getUser([withValidLicense]))
        expect(wrapper.classes()).not.toContain(className)
      })
    })

    describe('snapshots', () => {
      it('should match snapshot if user has no license', () => {
        const wrapper = createWrapperWithCurrentUser(getUser([withoutLicense]))
        expect(wrapper.element).toMatchSnapshot()
      })

      it('should match snapshot if user has expired license', () => {
        const wrapper = createWrapperWithCurrentUser(getUser([withExpiredLicense]))
        expect(wrapper.element).toMatchSnapshot()
      })

      it('should match snapshot if user has valid license', () => {
        const wrapper = createWrapperWithCurrentUser(getUser([withValidLicense]))
        expect(wrapper.element).toMatchSnapshot()
      })

      it('should match snapshot if user has valid license that expires in less than a day', () => {
        const licenseValidUntil = new Date(Date.now() + 60 * 60 * 1000) // now + 1 hour
        const user = getUser([withLicenseValidUntil({ date: licenseValidUntil })])
        const wrapper = createWrapperWithCurrentUser(user)
        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })

  describe('children', () => {
    describe('AccessInfo goToPayment', () => {
      it('should cause alert', () => {
        const wrapper = createWrapper()
        window.alert = jest.fn()
        wrapper.findComponent(AccessInfoDescription).vm.$emit('goToPayment')
        expect(window.alert).toHaveBeenCalled()
      })
    })
  })
})
