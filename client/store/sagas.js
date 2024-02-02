import axios from 'axios'

import EventEmitter from '../utils/event-emitter'
import Events from '../events'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
axios.defaults.transformRequest = [data => JSON.stringify(data)]
axios.defaults.transformResponse = [data => JSON.parse(data)]

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

    EventEmitter.subscribe(Events.ITEM_CREATE, this._create)
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

  _create = async name => {
    const item = new Item(name)

    const response = await axios.post('todos/create', item)

    EventEmitter.emit({
      type: Events.SAGA_ITEM_CREATED,
      payload: response.data,
    })
  }

  _updateStatus = ({ id }) => {
    //
    // EventEmitter.emit({
    //   type: Events.SAGA_ITEM_UPDATED,
    //   payload: item,
    // })
  }

  _updateName = ({ id, name }) => {
    //
    // EventEmitter.emit({
    //   type: Events.SAGA_ITEM_UPDATED,
    //   payload: item,
    // })
  }

  _delete = id => {
    //
    // EventEmitter.emit({
    //   type: Events.SAGA_ITEM_DELETED,
    //   payload: id,
    // })
  }

  _deleteDone = () => {
    //
    // EventEmitter.emit({
    //   type: Events.SAGA_DONE_DELETED,
    // })
  }

  async getItems() {
    const response = await axios.get('/todos/getAll')

    return response.data
  }
}

export default new Saga()
