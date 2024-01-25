export function removeAll(arr, test) {
    const _arr = [...arr]

    while (_arr.find(test)) {
        _arr.splice(_arr.findIndex(test), 1)
    }

    return _arr
}

export class Item {
    constructor(label) {
        this.id = new Date().toString()
        this.done = false
        this.label = label
    }
}