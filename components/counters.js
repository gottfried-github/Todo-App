import Store from "../store/store.js"
import {createElement} from "../lib/helpers.js"

export default function Counters() {
    const counterClass = "counter"

    const container = createElement("div")
    const doneEl = createElement("span", null, [counterClass], `${Store.getCount("done")} completed`)
    const notDoneEl = createElement("span", null, [counterClass], `${Store.getCount("notDone")} left`)

    container.append(doneEl, ", ", notDoneEl)

    return container
}