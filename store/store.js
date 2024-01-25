import EventEmitter from '../lib/event-emitter.js'
import Events from '../events.js'
import {Item} from '../lib/helpers.js'

const FILTERS = ["all", "done", "notDone"]

export class Store {
    constructor() {
        this._subscriptions = {}

        this.state = {
            items: [],
            filter: "all"
        }

        this.init()
    }

    init() {
        this._subscriptions._append = this._append.bind(this)
        this._subscriptions._updateStatus = this._updateStatus.bind(this)
        this._subscriptions._delete = this._delete.bind(this)
        this._subscriptions._deleteDone = this._deleteDone.bind(this)
        this._subscriptions._setFilter = this._setFilter.bind(this)

        EventEmitter.subscribe(Events.ITEM_APPEND_ONE, this._subscriptions._append)
        EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, this._subscriptions._updateStatus)
        EventEmitter.subscribe(Events.ITEM_DELETE_ONE, this._subscriptions._delete)
        EventEmitter.subscribe(Events.ITEM_DELETE_DONE, this._subscriptions._deleteDone)
        EventEmitter.subscribe(Events.SET_FILTER, this._subscriptions._setFilter)
    }

    unsubscribe() {
        EventEmitter.unsubscribe(Events.ITEM_APPEND_ONE, this._subscriptions._append)
        EventEmitter.unsubscribe(Events.ITEM_UPDATE_STATUS_ONE, this._subscriptions._updateStatus)
        EventEmitter.unsubscribe(Events.ITEM_DELETE_ONE, this._subscriptions._delete)
        EventEmitter.unsubscribe(Events.ITEM_DELETE_DONE, this._subscriptions._deleteDone)
        EventEmitter.unsubscribe(Events.SET_FILTER, this._subscriptions._setFilter)
    }

    _append(label) {
        this.state.items.push(new Item(label, false))
    }

    _updateStatus({id, done}) {
        this.state.items = this.state.items.map(item => {
            if (id === item.id) {
                return {
                    ...item, done
                }
            }

            return item
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

        this.state.filter = filter
    }

    getCount(filter) {
        if (!filter) return this.getItems().length

        switch (filter) {
            case "all":
                return this.state.items.length
            
            case "done":
                return this.state.items.filter(item => item.done).length

            case "notDone":
                return this.state.items.filter(item => !item.done).length

            default:
                throw new Error("invalid filter value in Store's state")
        }
    }

    getItems(filter) {
        const _filter = filter || this.state.filter

        switch (_filter) {
            case "all":
                return this.state.items
            
            case "done":
                return this.state.items.filter(item => item.done)

            case "notDone":
                return this.state.items.filter(item => !item.done)

            default:
                throw new Error("invalid filter value")
        }
    }

    getFilter() {
        return this.state.filter
    }
}

export default new Store()