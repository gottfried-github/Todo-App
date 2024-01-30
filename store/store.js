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

export class Store {
  constructor() {
    this.init()
  }

  init = () => {
    this.state = new Proxy(
      {
        items: [],
        filter: 'all',
      },
      {
        set(target, propName, v) {
          target[propName] = v
          EventEmitter.emit({ type: Events.STORAGE_UPDATED })

          return true
        },
      }
    )

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

  _append = (label) => {
    this.state.items = [...this.state.items, new Item(label, false)]
  }

  _updateStatus = ({ id }) => {
    this.state.items = this.state.items.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          done: !item.done,
        }
      }

      return item
    })
  }

  _updateLabel = ({ id, label }) => {
    this.state.items = this.state.items.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          label,
        }
      }

      return item
    })
  }

  _delete = (id) => {
    this.state.items = this.state.items.filter((item) => id !== item.id)
  }

  _deleteDone = () => {
    this.state.items = this.state.items.filter((item) => !item.done)
  }

  _setFilter = (filter) => {
    if (!FILTERS.includes(filter)) {
      throw new Error('invalid filter name')
    }

    this.state.filter = filter
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
