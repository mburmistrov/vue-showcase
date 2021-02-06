export class ChecklistManager {
  constructor({items, completedKeys}) {
    this._allKeys = items.map(i => i.key)
    this._completedKeys = completedKeys.slice()
  }

  get completedKeys() {
    return this._completedKeys
  }

  get keys() {
    return this._allKeys
  }

  get allCompleted() {
    return this.completedKeys.length === this.keys.length
  }

  isCompleted(key) {
    return this._completedKeys.includes(key)
  }

  complete(key) {
    if (!this._hasKey(key) || this.isCompleted(key)) return

    this._completedKeys.push(key)
  }

  _hasKey(key) {
    return this.keys.includes(key)
  }
}
