import EventEmitter from '../lib/event-emitter.js'
import {Component, createElement} from "../lib/helpers.js"

import Events from '../events.js'

export default class Input extends Component {
    constructor() {
        super()

        this.el = this.content()
    }

    content() {
        const inputEl = createElement("input", null, ["add"])

        inputEl.setAttribute("type", "text")
        inputEl.placeholder = "What needs to be done"

        inputEl.addEventListener("keyup", (ev) => {
            // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
            if (ev.isComposing || ev.code !== "Enter") return

            EventEmitter.emit(Events.ITEM_APPEND_ONE, ev.currentTarget.value)
            ev.currentTarget.value = ""
        })

        return inputEl
    }
}