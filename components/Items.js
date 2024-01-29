import EventEmitter from "../lib/event-emitter.js"
import Store from "../store/store.js"
import {Component, createElement} from "../lib/helpers.js"

import Events from "../events.js"

import Item from "./Item.js"

export default class Items extends Component {
  constructor() {
    super()
    
    this.editingId = null
    
    EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
    EventEmitter.subscribe(Events.STORAGE_FILTER_UPDATED, this.render)
  }
  
  handleEditing = (itemId) => {
    if (!this.editingId) {
      this.editingId = itemId
    } else if (this.editingId === itemId) {
      this.editingId = null
    } else {
      this.editingId = itemId
    }
    
    this.render()
  }
  
  content = () => {
    const container = createElement("ul", null, ["items"])
    
    const itemsEls = Store.getItems().map(item => 
      new Item(item, this.editingId === item.id, this.handleEditing).render()
      )
      
      container.append(...itemsEls)
      
      return container
    }
  }