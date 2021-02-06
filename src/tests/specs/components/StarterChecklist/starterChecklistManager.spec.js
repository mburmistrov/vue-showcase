import { merge } from 'lodash'
import { StarterChecklistManager } from '@/components/StarterChecklist/starterChecklistManager'
import { CategorizedChecklistManager } from '@/components/StarterChecklist/lib/categorizedChecklistManager'
import { starterChecklistApi } from '@/api/starterChecklist'
jest.mock('@/api/starterChecklist')

describe('StarterChecklistManager class instance', () => {
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

    return new StarterChecklistManager(merge(defaultParams, overrides))
  }

  it('should be instance of CategorizedChecklistManager', () => {
    const scm = createInstance()
    expect(scm).toBeInstanceOf(CategorizedChecklistManager)
  })

  it('complete should call parent class complete with correct key', () => {
    const scm = createInstance()
    let parentConstructor = Object.getPrototypeOf(scm.constructor)
    const spy = jest.spyOn(parentConstructor.prototype, 'complete')
    scm.complete('filterByDate')
    expect(spy).toHaveBeenCalledWith('filterByDate')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('complete should call api on call for key', async () => {
    expect.assertions(1)
    const scm = createInstance()
    await scm.complete('filterByDate')
    expect(starterChecklistApi.completeItem).toHaveBeenCalledTimes(1)
  })

  it('complete with unknown key should not call api', async () => {
    expect.assertions(1)
    const scm = createInstance()
    await scm.complete('blablakek')
    expect(starterChecklistApi.completeItem).toHaveBeenCalledTimes(0)
  })

  it('completeLocally should call parent class complete with correct key', async () => {
    const scm = createInstance()
    let parentConstructor = Object.getPrototypeOf(scm.constructor)
    const spy = jest.spyOn(parentConstructor.prototype, 'complete')
    scm.completeLocally('filterByDate')
    expect(spy).toHaveBeenCalledWith('filterByDate')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('completeLocally should not call api', async () => {
    expect.assertions(1)
    const scm = createInstance()
    await scm.completeLocally('filterByDate')
    expect(starterChecklistApi.completeItem).toHaveBeenCalledTimes(0)
  })
})
