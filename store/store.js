import EventEmitter from '../lib/event-emitter.js'
import Events from '../events.js'
import {Item} from './helpers.js'

const FILTERS = ["all", "done", "notDone"]

export default class Store {
    constructor() {
        this.state = {
            items: [],
            filter: "all"
        }
    }

    init() {
        EventEmitter.subscribe(Events.ITEM_APPEND_ONE, this._append)
        EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._updateStatus)
        EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._delete)
        EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._deleteDone)
        EventEmitter.subscribe(Events.SET_FILTER, this._setFilter)
    }

    _append(label, done) {
        this.state.items.push(new Item(label, done))
    }

    _updateStatus(done, id) {
        this.state.items.map(item => {
            if (id === item.id) {
                return {
                    ...item, done
                }
            }
        })
    }
    
    _delete(id) {
        this.state.items = this.state.items.filter(item => id !== item.id)
    }
    
    _deleteDone() {
        this.state.items = this.state.items.filter(item => !item.done)
    }

    _setFilter(filter) {
        if (!FILTERS.includes(filter)) {
            throw new Error("invalid filter name")
        }

        this.filter = filter
    }

    getCount(filter) {
        let count = null

        switch (filter) {
            case "all":
                count = this.state.items.length
                break
            
            case "done":
                count = this.state.items.filter(item => item.done).length
                break

            case "notDone":
                count = this.state.items.filter(item => !item.done).length
                break

            default:
                throw new Error("invalid filter value")
        }

        return count
    }

    getItems() {
        return this.state.items
    }

    getFilter() {
        return this.state.filter
    }
}