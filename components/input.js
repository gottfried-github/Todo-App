import EventEmitter from '../lib/event-emitter.js'
import {ITEM_APPEND_ONE} from '../events.js'

export default function Input() {
    const inputEl = createElement("input", null, ["add"])

    inputEl.setAttribute("type", "text")
    inputEl.placeholder = "What needs to be done"

    inputEl.addEventListener("keyup", (ev) => {
        // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
        if (ev.isComposing || ev.code !== "Enter") return

        EventEmitter.emit(ITEM_APPEND_ONE, ev.currentTarget.value)
    })

    return inputEl
}