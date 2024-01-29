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
    }

    content = () => {
        const container = createElement("div", null, ["container"])

        container.append(this.input.render(), this.controls.render(), this.items.render())

        return container
    }
}