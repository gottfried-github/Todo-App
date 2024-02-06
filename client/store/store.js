import EventEmitter from '../utils/event-emitter'
import Saga from './sagas'
import Events from '../events'

const FILTERS = ['all', 'done', 'notDone']

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

  init = async () => {
    const items = await Saga.getItems()

    console.log('Store.init, items:', items)

    this.state = {
      items: items,
      filter: 'all',
    }

    EventEmitter.subscribe(Events.SAGA_ITEM_CREATED, this._append)
    EventEmitter.subscribe(Events.SAGA_ITEM_UPDATED, this._updateItem)
    EventEmitter.subscribe(Events.SAGA_ITEM_DELETED, this._delete)
    EventEmitter.subscribe(Events.SAGA_DONE_DELETED, this._deleteDone)
    EventEmitter.subscribe(Events.SET_FILTER, this._setFilter)

    EventEmitter.emit({ type: Events.STORAGE_UPDATED })
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

  _updateItem = ({ id, fields }) => {
    this._setState({
      ...this.state,
      items: this.state.items.map(_item => {
        if (id === _item.id) {
          return {
            ..._item,
            ...fields,
          }
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
      items: this.state.items.filter(item => item.status === 2),
    })
  }

  _setFilter = filter => {
    if (!FILTERS.includes(filter)) {
      throw new Error('invalid filter')
    }

    this._setState({ ...this.state, filter })
  }

  getCount = filter => {
    if (!this.state) {
      return null
    }

    if (!filter) return this.getItems().length

    switch (filter) {
      case 'all':
        return this.state.items.length

      case 'done':
        return this.state.items.filter(item => item.status === 1).length

      case 'notDone':
        return this.state.items.filter(item => item.status === 2).length

      default:
        throw new Error("invalid filter value in Store's state")
    }
  }

  getItems = filter => {
    if (!this.state) {
      return null
    }

    const _filter = filter || this.state.filter

    switch (_filter) {
      case 'all':
        return this.state.items

      case 'done':
        return this.state.items.filter(item => item.status === 1)

      case 'notDone':
        return this.state.items.filter(item => item.status === 2)

      default:
        throw new Error('invalid filter value')
    }
  }

  getFilter = () => {
    if (!this.state) {
      return null
    }

    return this.state.filter
  }
}

export default new Store()