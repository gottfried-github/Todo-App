import EventEmitter from '../utils/event-emitter'
import Store from '../store/store'
import { Component, createElement } from '../utils/helpers'

import Events from '../events'

import Item from './Item'

export default class Items extends Component {
  constructor() {
    super()

    this.editingId = null

    EventEmitter.subscribe(Events.STORAGE_UPDATED, this.render)
  }

  handleEditing = itemId => {
    if (!this.editingId || this.editingId !== itemId) {
      this.editingId = itemId
    } else {
      this.editingId = null
    }

    this.render()
  }

  content = () => {
    const container = createElement('ul', null, ['items'])

    const itemsEls = Store.getItems().map(item =>
      new Item(item, this.editingId === item.id, this.handleEditing).render()
    )

    container.append(...itemsEls)

    return container
  }
}
