import EventEmitter from '../lib/event-emitter.js'
import Events from '../events.js'

const FILTERS = ['all', 'done', 'notDone']

class Item {
  constructor(label) {
    this.id = new Date()
    this.done = false
    this.label = label
  }
}

function deepEqual(newV, oldV) {
  if (Array.isArray(newV) && Array.isArray(oldV)) {
    if (newV.length !== oldV.length) {
      return false
    } else {
      const equal = newV.map((item, i) => {
        return deepEqual(item, oldV[i])
      })

      return equal.includes(false)
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

    const equal = keysNew.map((k) => deepEqual(newV[k], oldV[k]))

    return equal.includes(false)
  } else {
    return newV === oldV
  }
}

export class Store {
  constructor() {
    this.init()
  }

  init = () => {
    this.state = {
      items: [],
      filter: 'all',
    }

    EventEmitter.subscribe(Events.ITEM_APPEND_ONE, this._append)
    EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.subscribe(Events.ITEM_UPDATE_LABEL_ONE, this._updateLabel)
    EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
    EventEmitter.subscribe(Events.SET_FILTER, this._setFilter)
  }

  unsubscribe = () => {
    EventEmitter.unsubscribe(Events.ITEM_APPEND_ONE, this._append)
    EventEmitter.unsubscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.unsubscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.unsubscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
    EventEmitter.unsubscribe(Events.SET_FILTER, this._setFilter)
  }

  _setState(state) {
    if (
      (!state.filter || this.state.filter === state.filter) &&
      (!state.items || this.state.items === state.items)
    ) {
      return
    } else {
      if (state.filter && this.state.filter !== state.filter) {
        this.state.filter = state.filter
      }

      if (state.items && this.state.items !== state.items) {
        this.state.items = state.items
      }

      EventEmitter.emit({ type: Events.STORAGE_UPDATED })
    }
  }

  _append = (label) => {
    this._setState({
      items: [...this.state.items, new Item(label, false)],
    })
  }

  _updateStatus = ({ id }) => {
    this._setState({
      items: this.state.items.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            done: !item.done,
          }
        }

        return item
      }),
    })
  }

  _updateLabel = ({ id, label }) => {
    this._setState({
      items: this.state.items.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            label,
          }
        }

        return item
      }),
    })
  }

  _delete = (id) => {
    this._setState({
      items: this.state.items.filter((item) => id !== item.id),
    })
  }

  _deleteDone = () => {
    this._setState({
      items: this.state.items.filter((item) => !item.done),
    })
  }

  _setFilter = (filter) => {
    if (!FILTERS.includes(filter)) {
      throw new Error('invalid filter name')
    }

    this._setState({ filter })
  }

  getCount = (filter) => {
    if (!filter) return this.getItems().length

    switch (filter) {
      case 'all':
        return this.state.items.length

      case 'done':
        return this.state.items.filter((item) => item.done).length

      case 'notDone':
        return this.state.items.filter((item) => !item.done).length

      default:
        throw new Error("invalid filter value in Store's state")
    }
  }

  getItems = (filter) => {
    const _filter = filter || this.state.filter

    switch (_filter) {
      case 'all':
        return this.state.items

      case 'done':
        return this.state.items.filter((item) => item.done)

      case 'notDone':
        return this.state.items.filter((item) => !item.done)

      default:
        throw new Error('invalid filter value')
    }
  }

  getFilter = () => {
    return this.state.filter
  }
}

export default new Store()
