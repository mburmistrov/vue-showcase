import { ChecklistManager } from './checklistManager'
import { cloneDeep, intersection } from 'lodash'

export class CategorizedChecklistManager extends ChecklistManager {
  constructor({items, completedKeys}) {
    super({items, completedKeys})
    this._initialItems = cloneDeep(items)
    this._categories = Array.from(items.reduce((res, item) => {
      res.add(item.category)
      return res
    }, new Set()))
  }

  get categories() {
    return this._categories
  }

  keysForCategory(category) {
    return this._initialItems.reduce((res, item) => {
      if (item.category === category) {
        res.push(item.key)
      }
      return res
    }, [])
  }

  completedKeysForCategory(category) {
    const categoryKeys = this.keysForCategory(category)
    const completedKeys = this.completedKeys
    return intersection(categoryKeys, completedKeys)
  }
}
