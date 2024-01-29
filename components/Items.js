import EventEmitter from '../lib/event-emitter.js'
import Store from '../store/store.js'
import { Component, createElement } from '../lib/helpers.js'

import Events from '../events.js'

import Item from './Item.js'

export default class Items extends Component {
  constructor() {
    super()

    this.state.editingId = null

    EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
    EventEmitter.subscribe(Events.STORAGE_FILTER_UPDATED, this.render)
  }

  handleEditing = (itemId) => {
    if (!this.state.editingId || this.state.editingId !== itemId) {
      this.state.editingId = itemId
    } else {
      this.state.editingId = null
    }
  }

  content = () => {
    const container = createElement('ul', null, ['items'])

    const itemsEls = Store.getItems().map((item) =>
      new Item(item, this.state.editingId === item.id, this.handleEditing).render()
    )

    container.append(...itemsEls)

    return container
  }
}
