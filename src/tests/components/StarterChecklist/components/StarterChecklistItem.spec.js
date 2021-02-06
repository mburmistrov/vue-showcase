import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import StarterChecklistItem from '@/components/StarterChecklist/components/StarterChecklistItem'
import { merge } from 'lodash'

describe('StarterChecklistItem', () => {
  function createWrapper(overrides) {
    const defaultMountingOptions = {
      propsData: {
        itemKey: 'itemKey',
        isCompleted: false
      }
    }
    return shallowMount(StarterChecklistItem, merge(defaultMountingOptions, overrides))
  }

  describe('template', () => {
    function getL10nKeyForItemKey(itemKey) {
      return `starterChecklist.items.${itemKey}`
    }

    it('should have completed class if isCompleted prop is true', async () => {
      const completedClass = 'starter-checklist-item--completed'
      const wrapper = createWrapper()
      expect(wrapper.classes()).not.toContain(completedClass)
      wrapper.setProps({ isCompleted: true })
      await Vue.nextTick()
      expect(wrapper.classes()).toContain(completedClass)
    })

    it('should render content from items l10n key', async () => {
      const firstItemKey = 'firstKey'
      const secondItemKey = 'secondKey'
      const wrapper = createWrapper({ propsData: { itemKey: firstItemKey } })
      expect(wrapper.text()).toContain(getL10nKeyForItemKey(firstItemKey))
      wrapper.setProps({ itemKey: secondItemKey })
      await Vue.nextTick()
      expect(wrapper.text()).toContain(getL10nKeyForItemKey(secondItemKey))
    })
  })

  describe('snapshots', () => {
    it('should match snapshot', () => {
      const wrapper = createWrapper()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
