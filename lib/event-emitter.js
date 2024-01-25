class EventEmitter {
    constructor() {
        this.callbacksByEvent = {}
    }

    subscribe(evName, cb) {
        if (!this.callbacksByEvent[evName]) {
            this.callbacksByEvent[evName] = []
        }

        this.callbacksByEvent[evName].push(cb)
    }

    unsubscribe() {

    }

    emit(evName, payload) {
        if (!this.callbacksByEvent[evName] || !this.callbacksByEvent[evName].length) return

        this.callbacksByEvent[evName].forEach(cb => {
            cb.call(null, payload)
        })
    }
}