import Store from "../store/store.js"
import {createElement} from "../lib/helpers.js"

import Input from "./input.js"
import Items from "./items.js"
import Controls from "./controls.js"

export default class Todo {
    render() {
        const renderControls = Store.getCount("all") > 0

        const container = createElement("div", null, ["container"])

        const inputEl = new Input().render()
        const itemsEl = new Items().render()

        if (renderControls) {
            const controlsEl = new Controls().render()
            container.append(inputEl, controlsEl, itemsEl)
        } else {
            container.append(inputEl, itemsEl)
        }

        return container
    }
}