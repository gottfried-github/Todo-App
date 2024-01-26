import EventEmitter from "../lib/event-emitter.js"
import Store from "../store/store.js"
import {Component, createElement} from "../lib/helpers.js"

import Events from "../events.js"

import Item from "./item.js"

export default class Items extends Component {
    constructor() {
        super()

        this.el = this.content()

        EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
        EventEmitter.subscribe(Events.STORAGE_FILTER_UPDATED, this.render)
    }

    content() {
        const container = createElement("ul", null, ["items"])

        const itemsEls = Store.getItems().map(item => new Item(item).el)

        container.append(...itemsEls)

        return container
    }
}