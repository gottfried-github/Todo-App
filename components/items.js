import Store from "../store/store.js"
import {createElement} from "../lib/helpers.js"

import Item from "./item.js"

export default class Items {
    render() {
        const container = createElement("ul", null, ["items"])

        const itemsEls = Store.getItems().map(item => new Item(item).render())

        container.append(...itemsEls)

        return container
    }
}