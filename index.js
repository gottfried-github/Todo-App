/* Global state */
let items = []
let filter = 'all'

class Item {
    constructor(label) {
        this.id = new Date().toString()
        this.done = false
        this.label = label
    }
}

/*
    deal with items data
*/
function itemUpdateDone(done, id) {
    const i = items.map(item => item.id).indexOf(id)
    items[i].done = done
}

function itemDelete(id) {
    items = items.filter(item => id !== item.id)
}

function itemAppend(item) {
    items.push(item)
}

function itemsDeleteDone() {
    items = items.filter(item => !item.done)
}

/*
    Render the component
*/
function createElement(tag, id, classes, textContent) {
    const el = document.createElement(tag)
    
    if (id) el.id = id
    if (classes?.length) el.classList.add(...classes)
    if(textContent) el.textContent = textContent

    return el
}

function inputRender() {
    const inputEl = createElement("input", null, ["add"])

    inputEl.setAttribute("type", "text")
    inputEl.placeholder = "What needs to be done"

    inputEl.addEventListener("keyup", (ev) => {
        // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
        if (ev.isComposing || ev.code !== "Enter") return

        newItemCb(ev.currentTarget.value)
    })

    return inputEl
}

function makeFilterCb(cb, filterActiveClass) {
    return (ev) => {
        if (ev.target.classList.contains(filterActiveClass)) return
        console.log("filter cb, ev:", ev)

        cb()
    }
}

function controlsRender() {
    const container = createElement("div", null, ["controls"])
    const containerFilters = createElement("div", null, ["filters"])
    
    const filterClass = "filter", filterActiveClass = "active"

    const deleteDoneEl = createElement("button", null, null, "clear completed")
    const showAllEl = createElement("button", null, [filterClass], "all")
    const showDoneEl = createElement("button", null, [filterClass], "completed")
    const showNotDoneEl = createElement("button", null, [filterClass], "active")

    if ('all' === filter) {
        showAllEl.classList.add(filterActiveClass)
    } else if ('done' === filter) {
        showDoneEl.classList.add(filterActiveClass)
    } else {
        showNotDoneEl.classList.add(filterActiveClass)
    }

    deleteDoneEl.addEventListener("click", deleteDoneCb)
    showAllEl.addEventListener("click", makeFilterCb(showAllCb, filterActiveClass))
    showDoneEl.addEventListener("click", makeFilterCb(showDoneCb, filterActiveClass))
    showNotDoneEl.addEventListener("click", makeFilterCb(showNotDoneCb, filterActiveClass))

    const countersEl = countersRender()

    containerFilters.append(showAllEl, showDoneEl, showNotDoneEl)
    container.append(countersEl, containerFilters, deleteDoneEl)

    return container
}

function countersRender() {
    const counterClass = "counter"

    const container = createElement("div")
    const doneEl = createElement("span", null, [counterClass], `${items.filter(item => item.done).length} items done`)
    const notDoneEl = createElement("span", null, [counterClass], `${items.filter(item => !item.done).length} items left`)

    container.append(doneEl, notDoneEl)

    return container
}

function itemRender(item) {
    const container = createElement("li", null, ["item"])
    const containerInput = createElement("div", null, ["input-container"])
    const input = createElement("input", item.id)
    const label = createElement("label", null, null, item.label)
    const deleteBtn = createElement("button", null, ["delete"], "delete")

    input.setAttribute("type", "checkbox")
    input.checked = item.done
    label.setAttribute("for", input.id)
    if (item.done) label.classList.add("checked")

    containerInput.append(input, label)
    container.append(containerInput, deleteBtn)
    
    containerInput.addEventListener("click", (ev) => {
        input.checked
            ? doneCb(item.id)
            : notDoneCb(item.id)
    })

    deleteBtn.addEventListener("click", () => {deleteCb(item.id)})

    return container
}

function itemsRender() {
    const container = createElement("ul", null, ["items"])

    const _items = filter === "all"
        ? items
        : filter === "done"
            ? items.filter(item => item.done)
            : items.filter(item => !item.done)

    const itemsEls = _items.map(item => itemRender(item))

    container.append(...itemsEls)

    return container
}

function render() {
    const renderControls = items.length > 0

    const container = createElement("div", null, ["container"])

    const inputEl = inputRender()
    const itemsEl = itemsRender()

    if (renderControls) {
        const controlsEl = controlsRender()
        container.append(inputEl, controlsEl, itemsEl)
    } else {
        container.append(inputEl, itemsEl)
    }

    const containerPrev = document.querySelector(".container")

    if (containerPrev) {
        containerPrev.replaceWith(container)
    } else {
        document.querySelector(".app").appendChild(container)
    }
}

/* Event handlers */
function newItemCb(itemLabel) {
    itemAppend(new Item(itemLabel))
    render()
}

function doneCb(id) {
    itemUpdateDone(true, id)
    render()
}

function notDoneCb(id) {
    itemUpdateDone(false, id)
    render()
}

function deleteCb(id) {
    itemDelete(id)
    render()
}

function showAllCb() {
    filter = "all"
    render()
}

function showDoneCb() {
    filter = "done"
    render()
}

function showNotDoneCb() {
    filter = "notDone"
    render()
}

function deleteDoneCb() {
    itemsDeleteDone()
    render()
}

/* Main */
function main() {
    render()
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})