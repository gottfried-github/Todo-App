import EventEmitter from "../lib/event-emitter.js"
import {createElement} from "../lib/helpers.js"

import Events from "../events.js"

export default class Item {
    render(item) {
        const container = createElement("li", null, ["item"])
        const containerInput = createElement("div", null, ["input-container"])
        const input = createElement("input", item.id)
        const label = createElement("label", null, null, item.label)
        const deleteBtn = createElement("button", null, ["delete"], "delete")

        input.setAttribute("type", "checkbox")
        input.checked = item.done
        label.setAttribute("for", input.id)
        if (item.done) label.classList.add("checked")

        containerInput.append(input, label)
        container.append(containerInput, deleteBtn)
        
        containerInput.addEventListener("click", (ev) => {
            input.checked
                ? EventEmitter.emit(Events.ITEM_UPDATE_STATUS_ONE, {id: item.id, done: true})
                : EventEmitter.emit(Events.ITEM_UPDATE_STATUS_ONE, {id: item.id, done: false})
        })

        deleteBtn.addEventListener("click", () => {
            EventEmitter.emit(Events.ITEM_DELETE_ONE, item.id)
        })

        return container
    }
}