import Store from "../store/store.js"
import {createElement} from "../lib/helpers.js"

import Item from "./item.js"

export default function Items() {
    const container = createElement("ul", null, ["items"])

    const itemsEls = Store.getItems().map(item => Item(item))

    container.append(...itemsEls)

    return container
}