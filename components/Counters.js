import EventEmitter from "../lib/event-emitter.js"
import Store from "../store/store.js"
import {Component, createElement} from "../lib/helpers.js"

import Events from "../events.js"

export default class Counters extends Component {
    constructor() {
        super()

        EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
    }

    content = () => {
        const counterClass = "counter"

        const container = createElement("div")
        const doneEl = createElement("span", null, [counterClass], `${Store.getCount("done")} completed`)
        const notDoneEl = createElement("span", null, [counterClass], `${Store.getCount("notDone")} left`)
    
        container.append(doneEl, ", ", notDoneEl)
    
        return container
    }
}