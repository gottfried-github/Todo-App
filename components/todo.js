import Store from "../store/store.js"
import {Component, createElement} from "../lib/helpers.js"

import Input from "./input.js"
import Items from "./items.js"
import Controls from "./controls.js"

export default class Todo extends Component {
    constructor() {
        super()

        this.input = new Input()
        this.items = new Items()
        this.controls = new Controls()

        this.el = this.content()
    }

    content = () => {
        const container = createElement("div", null, ["container"])

        if (this.controls.el) {
            container.append(this.input.el, this.controls.el, this.items.el)
        } else {
            container.append(this.input.el, this.items.el)
        }

        return container
    }
}