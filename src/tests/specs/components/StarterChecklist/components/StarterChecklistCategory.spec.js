import { shallowMount } from '@vue/test-utils'
import StarterChecklistCategory from '@/components/StarterChecklist/components/StarterChecklistCategory'
import { merge } from 'lodash'

describe('StarterChecklistCategory', () => {
  function createWrapper(overrides) {
    const defaultMountingOptions = {
      propsData: {
        name: 'catName'
      }
    }
    return shallowMount(StarterChecklistCategory, merge(defaultMountingOptions, overrides))
  }

  describe('template', () => {
    it('should render name prop', () => {
      const wrapper = createWrapper()
      expect(wrapper.text()).toContain('catName')
    })

    it('should render default slot', () => {
      const wrapper = createWrapper({
        slots: {
          default: '<div class="lolkek123"></div>'
        }
      })
      expect(wrapper.find('.lolkek123').exists()).toBe(true)
    })
  })

  describe('snapshots', () => {
    it('should match snapshot', () => {
      const wrapper = createWrapper()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
