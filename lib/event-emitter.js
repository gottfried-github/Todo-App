import {removeAll} from './helpers.js'

export class EventEmitter {
    constructor() {
        this.callbacksByEvent = {}
    }

    subscribe(evName, cb) {
        if (!this.callbacksByEvent[evName]) {
            this.callbacksByEvent[evName] = []
        }

        this.callbacksByEvent[evName].push(cb)
    }

    unsubscribe(evName, cb) {
        if (!this.callbacksByEvent[evName] || !this.callbacksByEvent[evName].length) return

        this.callbacksByEvent[evName] = removeAll(_cb => cb === _cb)
    }

    emit(evName, payload) {
        if (!this.callbacksByEvent[evName] || !this.callbacksByEvent[evName].length) return

        this.callbacksByEvent[evName].forEach(cb => {
            cb.call(null, payload)
        })
    }
}

export default new EventEmitter()