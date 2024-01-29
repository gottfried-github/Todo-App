import EventEmitter from "../lib/event-emitter.js"
import Store from "../store/store.js"
import {Component, createElement} from "../lib/helpers.js"

import Events from "../events.js"

import Counters from "./Counters.js"

export default class Controls extends Component {
    constructor() {
        super()

        this.counters = new Counters()
        this.filterActiveClass = "active"

        EventEmitter.subscribe(Events.STORAGE_ITEMS_UPDATED, this.render)
        EventEmitter.subscribe(Events.STORAGE_FILTER_UPDATED, this.render)
    }

    handleDeleteDone = () => {
        EventEmitter.emit({type: Events.ITEM_DELETE_DONE})
    }

    handleShowAll = ev => {
        if (ev.target.classList.contains(this.filterActiveClass)) return
        EventEmitter.emit({
            type: Events.SET_FILTER, 
            payload: "all"
        })
    }

    handleShowDone = ev => {
        if (ev.target.classList.contains(this.filterActiveClass)) return
        EventEmitter.emit({
            type: Events.SET_FILTER, 
            payload: "done"
        })
    }

    handleShowNotDone = ev => {
        if (ev.target.classList.contains(this.filterActiveClass)) return
        EventEmitter.emit({
            type: Events.SET_FILTER, 
            payload: "notDone"
        })
    }

    content = () => {
        if (Store.getCount("all") === 0) return createElement("div")
        
        const container = createElement("div", null, ["controls"])
        const containerFilters = createElement("div", null, ["filters"])
        
        const filterClass = "filter"

        const deleteDoneEl = createElement("button", null, ["delete-done"], "clear completed")
        const showAllEl = createElement("button", null, [filterClass], "all")
        const showDoneEl = createElement("button", null, [filterClass], "completed")
        const showNotDoneEl = createElement("button", null, [filterClass], "active")

        if ('all' === Store.getFilter()) {
            showAllEl.classList.add(this.filterActiveClass)
        } else if ('done' === Store.getFilter()) {
            showDoneEl.classList.add(this.filterActiveClass)
        } else {
            showNotDoneEl.classList.add(this.filterActiveClass)
        }

        deleteDoneEl.addEventListener("click", this.handleDeleteDone)
        showAllEl.addEventListener("click", this.handleShowAll)
        showDoneEl.addEventListener("click", this.handleShowDone)
        showNotDoneEl.addEventListener("click", this.handleShowNotDone)

        containerFilters.append(showAllEl, showDoneEl, showNotDoneEl)
        container.append(this.counters.render(), containerFilters, deleteDoneEl)

        return container
    }
}