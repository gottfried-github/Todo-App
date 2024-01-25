import Input from "./input.js"
import Items from "./items.js"
import Controls from "./controls.js"

export default function Todo() {
    const renderControls = Store.getCount("all") > 0

    const container = createElement("div", null, ["container"])

    const inputEl = Input()
    const itemsEl = Items()

    if (renderControls) {
        const controlsEl = Controls()
        container.append(inputEl, controlsEl, itemsEl)
    } else {
        container.append(inputEl, itemsEl)
    }

    return container    
}