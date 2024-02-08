import axios from './http'

import EventEmitter from '../utils/event-emitter'
import Events from '../events'

class Item {
  constructor(name) {
    this.name = name
  }
}

class Saga {
  constructor() {
    this.init()
  }

  init = () => {
    EventEmitter.subscribe(Events.ITEM_CREATE, this._create)
    EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.subscribe(Events.ITEM_UPDATE_NAME, this._updateName)
    EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
  }

  unsubscribe = () => {
    EventEmitter.subscribe(Events.ITEM_CREATE, this._create)
    EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
    EventEmitter.subscribe(Events.ITEM_UPDATE_NAME, this._updateName)
    EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._delete)
    EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
  }

  _create = async name => {
    const item = new Item(name)

    try {
      const response = await axios.post('/todos', item)

      EventEmitter.emit({
        type: Events.SAGA_ITEM_CREATED,
        payload: response.data,
      })
    } catch (e) {
      console.log('Saga._create, axios errored - error:', e)
    }
  }

  _updateStatus = async ({ id, status }) => {
    try {
      await axios.patch(`/todos/${id}`, { status })

      EventEmitter.emit({
        type: Events.SAGA_ITEM_UPDATED,
        payload: { id, fields: { status } },
      })
    } catch (e) {
      console.log('Saga._updateStatus, axios errored - error:', e)
    }
  }

  _updateName = async ({ id, name }) => {
    try {
      await axios.patch(`/todos/${id}`, { name })

      EventEmitter.emit({
        type: Events.SAGA_ITEM_UPDATED,
        payload: { id, fields: { name } },
      })
    } catch (e) {
      console.log('Saga._updateName, axios errored - error:', e)
    }
  }

  _delete = async id => {
    try {
      await axios.delete(`/todos/${id}`)

      EventEmitter.emit({
        type: Events.SAGA_ITEM_DELETED,
        payload: id,
      })
    } catch (e) {
      console.log('Saga._delete, axios errored - error:', e)
    }
  }

  _deleteDone = async () => {
    try {
      await axios.delete('/todos')

      EventEmitter.emit({
        type: Events.SAGA_DONE_DELETED,
      })
    } catch (e) {
      console.log('Saga._deleteDone, axios errored - error:', e)
    }
  }

  async getItems() {
    try {
      const response = await axios.get('/todos')

      return response.data
    } catch (e) {
      console.log('Saga.getItems, axios errored - error:', e)
    }
  }
}

export default new Saga()
