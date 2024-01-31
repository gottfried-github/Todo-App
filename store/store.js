import EventEmitter from '../utils/event-emitter'
import Saga from './sagas'
import Events from '../events'

export function deepEqual(newV, oldV) {
  if (Array.isArray(newV) && Array.isArray(oldV)) {
    if (newV.length !== oldV.length) {
      return false
    } else {
      const equal = newV.map((item, i) => {
        return deepEqual(item, oldV[i])
      })

      return !equal.includes(false)
    }
  } else if (
    null !== newV &&
    'object' === typeof newV &&
    null !== oldV &&
    'object' === typeof oldV
  ) {
    const keysNew = Object.keys(newV)
    const keysOld = Object.keys(oldV)

    if (keysNew.length !== keysOld.length) return false

    for (const k of keysNew) {
      if (!keysOld.includes(k)) return false
    }

    const equal = keysNew.map(k => deepEqual(newV[k], oldV[k]))

    return !equal.includes(false)
  } else {
    return newV === oldV
  }
}

export class Store {
  constructor() {
    this.init()
  }

  init = () => {
    this.state = Saga.getData()

    EventEmitter.subscribe(Events.SAGA_ITEM_APPENDED, this._append)
    EventEmitter.subscribe(Events.SAGA_ITEM_UPDATED, this._updateItem)
    EventEmitter.subscribe(Events.SAGA_ITEMS_DELETED, this._delete)
    EventEmitter.subscribe(Events.SAGA_FILTER_SET, this._setFilter)
  }

  unsubscribe = () => {
    EventEmitter.subscribe(Events.SAGA_ITEM_APPENDED, this._append)
    EventEmitter.subscribe(Events.SAGA_ITEM_UPDATED, this._updateItem)
    EventEmitter.subscribe(Events.SAGA_ITEMS_DELETED, this._delete)
    EventEmitter.subscribe(Events.SAGA_FILTER_SET, this._setFilter)
  }

  _setState(state) {
    if (deepEqual(state, this.state)) return

    this.state = state
    EventEmitter.emit({ type: Events.STORAGE_UPDATED })
  }

  _append = item => {
    this._setState({
      ...this.state,
      items: [...this.state.items, item],
    })
  }

  _updateItem = item => {
    this._setState({
      ...this.state,
      items: this.state.items.map(_item => {
        if (item.id === _item.id) {
          return item
        }

        return _item
      }),
    })
  }

  _delete = itemsIds => {
    this._setState({
      ...this.state,
      items: this.state.items.filter(item => !itemsIds.includes(item.id)),
    })
  }

  _setFilter = filter => {
    this._setState({ ...this.state, filter })
  }

  getCount = filter => {
    if (!filter) return this.getItems().length

    switch (filter) {
      case 'all':
        return this.state.items.length

      case 'done':
        return this.state.items.filter(item => item.done).length

      case 'notDone':
        return this.state.items.filter(item => !item.done).length

      default:
        throw new Error("invalid filter value in Store's state")
    }
  }

  getItems = filter => {
    const _filter = filter || this.state.filter

    switch (_filter) {
      case 'all':
        return this.state.items

      case 'done':
        return this.state.items.filter(item => item.done)

      case 'notDone':
        return this.state.items.filter(item => !item.done)

      default:
        throw new Error('invalid filter value')
    }
  }

  getFilter = () => {
    return this.state.filter
  }
}

export default new Store()
