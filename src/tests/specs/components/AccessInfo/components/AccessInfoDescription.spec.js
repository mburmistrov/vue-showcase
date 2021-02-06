import { shallowMount, createLocalVue } from '@vue/test-utils'
import AccessInfoDescription from '@/components/AccessInfo/components/AccessInfoDescription'
import { merge } from 'lodash'
import Vuex from 'vuex'
import { storeConfig } from '@/store'
import { getUser, withValidLicense, withExpiredLicense, withoutLicense } from '@/tests/utils/getUser'

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

describe('AccessInfoDescription', () => {
  function createWrapper(overrides) {
    const defaultMountingOptions = {
      localVue,
      store: createStore()
    }

    return shallowMount(AccessInfoDescription, merge(defaultMountingOptions, overrides))
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
    it('should emit goToPayment on goToPayment click', () => {
      const wrapper = createWrapper()
      wrapper.findComponent({ ref: 'goToPayment' }).trigger('click')
      expect(wrapper.emitted().goToPayment).toBeTruthy()
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
    })
  })
})
