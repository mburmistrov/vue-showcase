import { StarterChecklistManager } from '@/components/StarterChecklist/starterChecklistManager'
import { items as allItems } from './items'

export default function install(Vue, { items = allItems, completedKeys }) {
  let starterChecklistPlugin = {}
  starterChecklistPlugin.items = itemsKeysObj(items)
  starterChecklistPlugin.manager = new StarterChecklistManager({ items, completedKeys })
  starterChecklistPlugin.completeItem = async (key) => {
    await starterChecklistPlugin.manager.complete(key)
  }
  starterChecklistPlugin.markItemAsCompleted = async (key) => {
    await starterChecklistPlugin.manager.completeLocally(key)
  }

  Object.defineProperty(Vue.prototype, '$starterChecklist', {
    get() {
      return starterChecklistPlugin
    }
  })
}

function itemsKeysObj(items) {
  return items.reduce((acc, item) => {
    acc[item.key] = item.key
    return acc
  }, {})
}
