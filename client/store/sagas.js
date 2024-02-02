import EventEmitter from '../utils/event-emitter'
import Events from '../events'

class Item {
  constructor(name) {
    this.name = name
    this.timeCreated = new Date()
  }
}

class Saga {
  constructor() {
    this.init()
  }

  init = () => {
    //

    EventEmitter.subscribe(Events.ITEM_CREATE, this._append)
    EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.subscribe(Events.ITEM_UPDATE_LABEL_ONE, this._updateLabel)
    EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
  }

  unsubscribe = () => {
    EventEmitter.unsubscribe(Events.ITEM_APPEND_ONE, this._append)
    EventEmitter.unsubscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.unsubscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.unsubscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
  }

  _getItems() {
    return JSON.parse(localStorage.getItem('items'))
  }

  _setItems(items) {
    localStorage.setItem('items', JSON.stringify(items))
  }

  _create = name => {
    //

    EventEmitter.emit({
      type: Events.SAGA_ITEM_CREATED,
      payload: item,
    })
  }

  _updateStatus = ({ id }) => {
    //

    EventEmitter.emit({
      type: Events.SAGA_ITEM_UPDATED,
      payload: item,
    })
  }

  _updateName = ({ id, name }) => {
    //

    EventEmitter.emit({
      type: Events.SAGA_ITEM_UPDATED,
      payload: item,
    })
  }

  _delete = id => {
    //

    EventEmitter.emit({
      type: Events.SAGA_ITEM_DELETED,
      payload: id,
    })
  }

  _deleteDone = () => {
    //

    EventEmitter.emit({
      type: Events.SAGA_DONE_DELETED,
    })
  }

  getItems() {
    //
  }
}

export default new Saga()
