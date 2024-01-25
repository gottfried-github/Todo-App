import {Item} from './helpers.js'

const FILTERS = ["all", "done", "notDone"]

class Store {
    constructor() {
        this.state = {
            items: [],
            filter: "all"
        }
    }
    
    append(item) {
        this.state.items.push(item)
    }

    updateStatus(done, id) {
        this.state.items.map(item => {
            if (id === item.id) {
                return {
                    ...item, done
                }
            }
        })
    }
    
    delete(id) {
        this.state.items = this.state.items.filter(item => id !== item.id)
    }
    
    deleteDone() {
        this.state.items = this.state.items.filter(item => !item.done)
    }

    setFilter(filter) {
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
}