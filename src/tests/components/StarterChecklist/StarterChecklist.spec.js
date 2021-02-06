import { shallowMount } from '@vue/test-utils'
import StarterChecklist from '@/components/StarterChecklist/StarterChecklist'
import StarterChecklistCategory from '@/components/StarterChecklist/components/StarterChecklistCategory'
import StarterChecklistItem from '@/components/StarterChecklist/components/StarterChecklistItem'
import { StarterChecklistManager } from '@/components/StarterChecklist/starterChecklistManager'
import { merge } from 'lodash'

describe('StarterChecklist', () => {
  function createWrapper(overrides) {
    const items = [
      {
        key: 'searchByText',
        category: 'search'
      },
      {
        key: 'searchByApp',
        category: 'search'
      },
      {
        key: 'filterByDate',
        category: 'filter'
      }
    ]
    const completedKeys = ['searchByApp']

    const defaultMountingOptions = {
      propsData: {
        manager: new StarterChecklistManager({ items, completedKeys })
      }
    }

    return shallowMount(StarterChecklist, merge(defaultMountingOptions, overrides))
  }

  describe('template', () => {
    function getL10nKeyForCategoryName(categoryName) {
      return `starterChecklist.categories.${categoryName}`
    }

    it('should have correct categories', () => {
      const wrapper = createWrapper()
      const categoryRefWrappers = wrapper.findAllComponents(StarterChecklistCategory)
      expect(categoryRefWrappers.length).toBe(2)
      expect(categoryRefWrappers.at(0).props().name).toBe(getL10nKeyForCategoryName('search'))
      expect(categoryRefWrappers.at(1).props().name).toBe(getL10nKeyForCategoryName('filter'))
    })

    it('should have correct amount of items in categories', () => {
      const wrapper = createWrapper()
      const categoryRefWrappers = wrapper.findAllComponents(StarterChecklistCategory)
      expect(categoryRefWrappers.at(0).findAllComponents(StarterChecklistItem).length).toBe(2)
      expect(categoryRefWrappers.at(1).findAllComponents(StarterChecklistItem).length).toBe(1)
    })

    it('categories should have correct items with correct props', () => {
      const wrapper = createWrapper()
      const categoryRefWrappers = wrapper.findAllComponents(StarterChecklistCategory)

      const firstCatItemWrappers = categoryRefWrappers.at(0).findAllComponents(StarterChecklistItem)
      expect(firstCatItemWrappers.at(0).props()).toEqual({ itemKey: 'searchByText', isCompleted: false })
      expect(firstCatItemWrappers.at(1).props()).toEqual({ itemKey: 'searchByApp', isCompleted: true })
      expect(firstCatItemWrappers.length).toBe(2)

      const secondCatItemWrappers = categoryRefWrappers.at(1).findAllComponents(StarterChecklistItem)
      expect(secondCatItemWrappers.at(0).props()).toEqual({ itemKey: 'filterByDate', isCompleted: false })
      expect(secondCatItemWrappers.length).toBe(1)
    })

    it('should display congrats when all items are completed', () => {
      const ref = 'congrats'
      const wrapper = createWrapper()
      expect(wrapper.findComponent({ ref }).exists()).toBe(false)

      const items = [{ key: 'foo', category: 'bar' }]
      const completedKeys = ['foo']
      const propsData = { manager: new StarterChecklistManager({ items, completedKeys }) }
      const allCompletedWrapper = createWrapper({ propsData })
      expect(allCompletedWrapper.findComponent({ ref }).exists()).toBe(true)
    })
  })

  describe('emits', () => {
    it('close on close click', () => {
      const event = 'close'
      const ref = 'close'
      const wrapper = createWrapper()
      expect(wrapper.emitted()[event]).toBeFalsy()
      wrapper.findComponent({ ref }).trigger('click')
      expect(wrapper.emitted()[event]).toBeTruthy()
    })
  })

  describe('snapshots', () => {
    it('should match snapshot', () => {
      const wrapper = createWrapper()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
