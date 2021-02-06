import { merge } from 'lodash'
import { ChecklistManager } from '@/components/StarterChecklist/lib/checklistManager'

describe('ChecklistManager class instance', () => {
  function createInstance(overrides) {
    const defaultParams = {
      items: [
        {
          key: 'searchByText'
        },
        {
          key: 'searchByApp'
        },
        {
          key: 'filterByDate'
        }
      ],
      completedKeys: ['searchByApp']
    }

    return new ChecklistManager(merge(defaultParams, overrides))
  }

  it('should have correct keys', () => {
    const cm = createInstance()
    expect(cm.keys).toEqual(['searchByText', 'searchByApp', 'filterByDate'])
  })

  it('should have correct completed keys', () => {
    const cm = createInstance()
    expect(cm.completedKeys).toEqual(['searchByApp'])
  })

  describe('isCompleted', () => {
    it('should return true for completed keys', () => {
      const cm = createInstance()
      expect(cm.isCompleted('searchByText')).toBe(false)
      expect(cm.isCompleted('filterByDate')).toBe(false)
      expect(cm.isCompleted('searchByApp')).toBe(true)
    })

    it('should return false for unknown keys', () => {
      const cm = createInstance()
      expect(cm.isCompleted('blablabla.kek')).toBe(false)
    })
  })

  describe('complete', () => {
    it('for uncompleted key should make it completed', () => {
      const key = 'searchByText'
      const cm = createInstance()
      expect(cm.isCompleted(key)).toEqual(false)
      expect(cm.completedKeys).not.toContain(key)
      cm.complete(key)
      expect(cm.isCompleted(key)).toEqual(true)
      expect(cm.completedKeys).toContain(key)
    })

    it('for completed key should not change completed keys', () => {
      const key = 'searchByApp'
      const cm = createInstance()
      const beforeCompletedKeys = [ ...cm.completedKeys ]
      cm.complete(key)
      expect(cm.completedKeys).toEqual(beforeCompletedKeys)
    })

    it('for unknown key should not change completed keys', () => {
      const key = 'blablaKek'
      const cm = createInstance()
      const beforeCompletedKeys = [ ...cm.completedKeys ]
      cm.complete(key)
      expect(cm.completedKeys).toEqual(beforeCompletedKeys)
    })

    it('should not change keys', () => {
      const nonCompletedkey = 'searchByText'
      const completedKey = 'searchByApp'
      const unknownKey = 'blablaKek'
      const cm = createInstance()
      const beforeKeys = [ ...cm.keys ]
      cm.complete(nonCompletedkey)
      expect(cm.keys).toEqual(beforeKeys)
      cm.complete(completedKey)
      expect(cm.keys).toEqual(beforeKeys)
      cm.complete(unknownKey)
      expect(cm.keys).toEqual(beforeKeys)
    })

    it('allCompleted should return true if all items are completed', () => {
      const cm = createInstance()
      expect(cm.allCompleted).toBe(false)
      cm.complete('searchByText')
      cm.complete('filterByDate')
      expect(cm.allCompleted).toBe(true)
    })
  })
})
