import { merge } from 'lodash'
import { CategorizedChecklistManager } from '@/components/StarterChecklist/lib/categorizedChecklistManager'
import { ChecklistManager } from '@/components/StarterChecklist/lib/checklistManager'

describe('CategorizedChecklistManager class instance', () => {
  function createInstance(overrides) {
    const defaultParams = {
      items: [
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
      ],
      completedKeys: ['searchByApp']
    }

    return new CategorizedChecklistManager(merge(defaultParams, overrides))
  }

  it('should be instance of StarterChecklistManager', () => {
    const ccm = createInstance()
    expect(ccm).toBeInstanceOf(ChecklistManager)
  })

  it('should have correct categories', () => {
    const ccm = createInstance()
    expect(ccm.categories).toEqual(['search', 'filter'])
  })

  it('should have correct keys by category', () => {
    const ccm = createInstance()
    expect(ccm.keysForCategory('search')).toEqual(['searchByText', 'searchByApp'])
    expect(ccm.keysForCategory('filter')).toEqual(['filterByDate'])
    expect(ccm.keysForCategory('unknownCategory')).toEqual([])
  })

  it('should have correct completed keys by category', () => {
    const ccm = createInstance()
    expect(ccm.completedKeysForCategory('search')).toEqual(['searchByApp'])
    expect(ccm.completedKeysForCategory('filter')).toEqual([])
    expect(ccm.completedKeysForCategory('unknownCategory')).toEqual([])
  })
})
