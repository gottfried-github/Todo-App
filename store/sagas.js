import EventEmitter from '../utils/event-emitter'
import Events from '../events'

const FILTERS = ['all', 'done', 'notDone']

class Item {
  constructor(label) {
    this.id = Date.now()
    this.done = false
    this.label = label
  }
}

class Saga {
  constructor() {
    this.init()
  }

  init = () => {
    if (!localStorage.getItem('items')) {
      localStorage.setItem('items', JSON.stringify([]))
    }

    if (!localStorage.getItem('filter')) {
      localStorage.setItem('filter', 'all')
    }

    EventEmitter.subscribe(Events.ITEM_APPEND_ONE, this._append)
    EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.subscribe(Events.ITEM_UPDATE_LABEL_ONE, this._updateLabel)
    EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
    EventEmitter.subscribe(Events.SET_FILTER, this._updateFilter)
  }

  unsubscribe = () => {
    EventEmitter.unsubscribe(Events.ITEM_APPEND_ONE, this._append)
    EventEmitter.unsubscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.unsubscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.unsubscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
    EventEmitter.unsubscribe(Events.SET_FILTER, this._updateFilter)
  }

  _getItems() {
    return JSON.parse(localStorage.getItem('items'))
  }

  _setItems(items) {
    localStorage.setItem('items', JSON.stringify(items))
  }

  _getFilter() {
    return localStorage.getItem('filter')
  }

  _setFilter(filter) {
    localStorage.setItem('filter', filter)
  }

  _append = label => {
    const item = new Item(label, false)
    const items = this._getItems()

    this._setItems([...items, item])

    EventEmitter.emit({
      type: Events.SAGA_ITEM_APPENDED,
      payload: item,
    })
  }

  _updateStatus = ({ id }) => {
    const items = this._getItems()

    const itemsNew = items.map(item => {
      if (id === item.id) {
        return {
          ...item,
          done: !item.done,
        }
      }

      return item
    })

    this._setItems(itemsNew)

    EventEmitter.emit({
      type: Events.SAGA_ITEM_UPDATED,
      payload: itemsNew.find(item => id === item.id),
    })
  }

  _updateLabel = ({ id, label }) => {
    const items = this._getItems()

    const itemsNew = items.map(item => {
      if (id === item.id) {
        return {
          ...item,
          label,
        }
      }

      return item
    })

    this._setItems(itemsNew)

    EventEmitter.emit({
      type: Events.SAGA_ITEM_UPDATED,
      payload: itemsNew.find(item => id === item.id),
    })
  }

  _delete = id => {
    const items = this._getItems()

    const item = items.find(item => id === item.id)

    this._setItems(items.filter(item => id !== item.id))

    EventEmitter.emit({
      type: Events.SAGA_ITEMS_DELETED,
      payload: [item.id],
    })
  }

  _deleteDone = () => {
    const items = this._getItems()

    const itemsDeleted = items.filter(item => item.done)

    this._setItems(items.filter(item => !item.done))

    EventEmitter.emit({
      type: Events.SAGA_ITEMS_DELETED,
      payload: itemsDeleted.map(item => item.id),
    })
  }

  _updateFilter = filter => {
    if (!FILTERS.includes(filter)) {
      throw new Error('invalid filter name')
    }

    this._setFilter(filter)

    EventEmitter.emit({
      type: Events.SAGA_FILTER_SET,
      payload: filter,
    })
  }

  getData() {
    return {
      items: this._getItems(),
      filter: this._getFilter(),
    }
  }
}

export default new Saga()
