import EventEmitter from "../lib/event-emitter.js"
import Store from "../store/store.js"
import Events from "../events.js"

import Counters from "./counters.js"

export default function Controls() {
    const container = createElement("div", null, ["controls"])
    const containerFilters = createElement("div", null, ["filters"])
    
    const filterClass = "filter", filterActiveClass = "active"

    const deleteDoneEl = createElement("button", null, null, "clear completed")
    const showAllEl = createElement("button", null, [filterClass], "all")
    const showDoneEl = createElement("button", null, [filterClass], "completed")
    const showNotDoneEl = createElement("button", null, [filterClass], "active")

    if ('all' === Store.getFilter()) {
        showAllEl.classList.add(filterActiveClass)
    } else if ('done' === Store.getFilter()) {
        showDoneEl.classList.add(filterActiveClass)
    } else {
        showNotDoneEl.classList.add(filterActiveClass)
    }

    deleteDoneEl.addEventListener("click", () => {
        EventEmitter.emit(Events.ITEM_DELETE_DONE)
    })

    showAllEl.addEventListener("click", makeFilterCb(() => {
        EventEmitter.emit(Events.SET_FILTER, "all")
    }, filterActiveClass))

    showDoneEl.addEventListener("click", makeFilterCb(() => {
        EventEmitter.emit(Events.SET_FILTER, "done")
    }, filterActiveClass))

    showNotDoneEl.addEventListener("click", makeFilterCb(() => {
        EventEmitter.emit(Events.SET_FILTER, "notDone")
    }, filterActiveClass))

    const countersEl = Counters()

    containerFilters.append(showAllEl, showDoneEl, showNotDoneEl)
    container.append(countersEl, containerFilters, deleteDoneEl)

    return container
}