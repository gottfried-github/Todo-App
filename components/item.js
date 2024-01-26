import EventEmitter from "../lib/event-emitter.js"
import {Component, createElement} from "../lib/helpers.js"

import Events from "../events.js"

export default class Item extends Component {
    constructor(item) {
        super()

        this.item = item

        this.el = this.content()
        
        EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
    }

    content() {
        const container = createElement("li", null, ["item"])
        const containerInput = createElement("div", null, ["input-container"])
        const input = createElement("input", this.item.id)
        const label = createElement("label", null, null, this.item.label)
        const deleteBtn = createElement("button", null, ["delete"], "delete")

        input.setAttribute("type", "checkbox")
        input.checked = this.item.done
        label.setAttribute("for", input.id)
        if (this.item.done) label.classList.add("checked")

        containerInput.append(input, label)
        container.append(containerInput, deleteBtn)
        
        containerInput.addEventListener("click", (ev) => {
            input.checked
                ? EventEmitter.emit(Events.ITEM_UPDATE_STATUS_ONE, {id: this.item.id, done: true})
                : EventEmitter.emit(Events.ITEM_UPDATE_STATUS_ONE, {id: this.item.id, done: false})
        })

        deleteBtn.addEventListener("click", () => {
            EventEmitter.emit(Events.ITEM_DELETE_ONE, this.item.id)
        })

        return container
    }
}