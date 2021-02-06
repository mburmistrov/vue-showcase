import { CategorizedChecklistManager } from './lib/categorizedChecklistManager'
import { starterChecklistApi } from '@/api/starterChecklist'

export class StarterChecklistManager extends CategorizedChecklistManager {
  async complete(key) {
    super.complete(key)

    if (!this._hasKey(key)) return

    await starterChecklistApi.completeItem(key)
  }

  async completeLocally(key) {
    super.complete(key)
  }
}
