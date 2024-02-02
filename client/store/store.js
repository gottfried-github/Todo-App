import EventEmitter from '../utils/event-emitter'
import Saga from './sagas'
import Events from '../events'

const FILTERS = ['all', 'done', 'notDone']

export function deepEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    } else {
      const equal = a.map((item, i) => {
        return deepEqual(item, b[i])
      })

      return !equal.includes(false)
    }
  } else if (null !== a && 'object' === typeof a && null !== b && 'object' === typeof b) {
    const keysNew = Object.keys(a)
    const keysOld = Object.keys(b)

    if (keysNew.length !== keysOld.length) return false

    for (const k of keysNew) {
      if (!keysOld.includes(k)) return false
    }

    const equal = keysNew.map(k => deepEqual(a[k], b[k]))

    return !equal.includes(false)
  } else {
    return a === b
  }
}

export class Store {
  constructor() {
    this.init()
  }

  init = () => {
    this.state = Saga.getData()

    EventEmitter.subscribe(Events.SAGA_ITEM_CREATED, this._append)
    EventEmitter.subscribe(Events.SAGA_ITEM_UPDATED, this._updateItem)
    EventEmitter.subscribe(Events.SAGA_ITEM_DELETED, this._delete)
    EventEmitter.subscribe(Events.SAGA_DONE_DELETED, this._deleteDone)
    EventEmitter.subscribe(Events.SET_FILTER, this._setFilter)
  }

  unsubscribe = () => {
    EventEmitter.unsubscribe(Events.SAGA_ITEM_CREATED, this._append)
    EventEmitter.unsubscribe(Events.SAGA_ITEM_UPDATED, this._updateItem)
    EventEmitter.unsubscribe(Events.SAGA_ITEM_DELETED, this._delete)
    EventEmitter.unsubscribe(Events.SAGA_DONE_DELETED, this._deleteDone)
    EventEmitter.unsubscribe(Events.SET_FILTER, this._setFilter)
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

  _delete = id => {
    this._setState({
      ...this.state,
      items: this.state.items.filter(item => id !== item.id),
    })
  }

  _deleteDone = () => {
    this._setState({
      ...this.state,
      items: this.state.items.filter(item => !item.done),
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
