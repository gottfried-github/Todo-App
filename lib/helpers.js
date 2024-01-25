export class Item {
    constructor(label) {
        this.id = new Date().toString()
        this.done = false
        this.label = label
    }
}

export function removeAll(arr, test) {
    const _arr = [...arr]

    while (_arr.find(test)) {
        _arr.splice(_arr.findIndex(test), 1)
    }

    return _arr
}

export function makeFilterCb(cb, filterActiveClass) {
    return (ev) => {
        if (ev.target.classList.contains(filterActiveClass)) return
        console.log("filter cb, ev:", ev)

        cb()
    }
}

export function createElement(tag, id, classes, textContent) {
    const el = document.createElement(tag)
    
    if (id) el.id = id
    if (classes?.length) el.classList.add(...classes)
    if(textContent) el.textContent = textContent

    return el
}