import EventEmitter from "../lib/event-emitter.js"
import Store from "../store/store.js"
import {Component, createElement, makeFilterCb} from "../lib/helpers.js"

import Events from "../events.js"

import Counters from "./counters.js"

export default class Controls extends Component {
    constructor() {
        super()

        this.counters = new Counters()

        this.el = this.content()

        EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
        EventEmitter.subscribe(Events.STORAGE_FILTER_UPDATED, this.render)
    }

    content() {
        if (Store.getCount("all") === 0) return createElement("div")
        
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

        containerFilters.append(showAllEl, showDoneEl, showNotDoneEl)
        container.append(this.counters.el, containerFilters, deleteDoneEl)

        return container
    }
}