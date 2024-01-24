/*
    deal with items data
*/
function itemUpdateDone(done, i, items) {
    return items.map((item) => 
        i === item.i
            ? {...item, item: {...item.item, done}}
            : item
    )
}

function itemDelete(i, items) {
    return items.reduce((items, item) => {
        if (i === item.i) return items

        items.push(item)
        return items
    }, []).map((item, i) => {
        return {...item, i}
    })
}

function itemAppend(item, items) {
    return [...items, {i: items.length, item}]
}

function itemsDeleteDone(items) {
    return items.reduce((itemsNotDone, item) => {
        if (item.item.done) return itemsNotDone

        itemsNotDone.push({...item})

        return itemsNotDone
    }, []).map((item, i) => ({...item, i}))
}

function itemsNotDone(items) {
    return items.reduce((itemsNotDone, item) => {
        if (item.item.done) return itemsNotDone

        itemsNotDone.push({...item})

        return itemsNotDone
    }, [])
}

function itemsDone(items) {
    return items.reduce((itemsDone, item) => {
        if (!item.item.done) return itemsDone

        itemsDone.push({...item})

        return itemsDone
    }, [])
}

/*
    Render the component
*/
function inputRender(submitCb) {
    const inputEl = document.createElement("input")
    inputEl.setAttribute("type", "text")

    inputEl.addEventListener("keyup", (ev) => {
        // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
        if (ev.isComposing || ev.code !== "Enter") return

        submitCb(ev.currentTarget.value)
    })

    return inputEl
}

function makeFilterCb(cb, filterActiveClass) {
    return (ev) => {
        if (ev.target.classList.contains(filterActiveClass)) return

        cb()
    }
}

function controlsRender({showAllCb, showDoneCb, showNotDoneCb, deleteDoneCb, showAll, showDone, doneCount, notDoneCount}) {
    const container = document.createElement("div")
    const filterClass = "filter", filterActiveClass = "active"

    const deleteDoneEl = document.createElement("button")
    const showAllEl = document.createElement("button")
    const showDoneEl = document.createElement("button")
    const showNotDoneEl = document.createElement("button")

    showAllEl.classList.add(filterClass)
    showDoneEl.classList.add(filterClass)
    showNotDoneEl.classList.add(filterClass)

    if (showAll) {
        showAllEl.classList.add(filterActiveClass)
    } else if (showDone) {
        showDoneEl.classList.add(filterActiveClass)
    } else {
        showNotDoneEl.classList.add(filterActiveClass)
    }

    deleteDoneEl.innerText = "delete"
    showAllEl.innerText = "all"
    showDoneEl.innerText = "done"
    showNotDoneEl.innerText = "active"

    deleteDoneEl.addEventListener("click", deleteDoneCb)
    showAllEl.addEventListener("click", makeFilterCb(showAllCb, filterActiveClass))
    showDoneEl.addEventListener("click", makeFilterCb(showDoneCb, filterActiveClass))
    showNotDoneEl.addEventListener("click", makeFilterCb(showNotDoneCb, filterActiveClass))

    const countersEl = countersRender({doneCount, notDoneCount})

    container.append(countersEl, deleteDoneEl, showAllEl, showDoneEl, showNotDoneEl)

    return container
}

function countersRender({doneCount, notDoneCount}) {
    const container = document.createElement("div")
    const doneEl = document.createElement("span")
    const notDoneEl = document.createElement("span")

    doneEl.innerText = `${doneCount} items are done`
    notDoneEl.innerText = `${notDoneCount} items left`

    container.append(doneEl, notDoneEl)

    return container
}

function itemRender(item, {doneCb, notDoneCb, deleteCb}) {
    const container = document.createElement("li")
    const input = document.createElement("input")
    const label = document.createElement("label")
    const deleteBtn = document.createElement("button")

    input.setAttribute("type", "checkbox")
    input.id = item.i.toString()
    input.checked = item.item.done
    label.setAttribute("for", input.id)

    label.innerText = item.item.label
    deleteBtn.innerText = "delete"

    container.append(input, label, deleteBtn)
    
    input.addEventListener("click", (ev) => {
        input.checked
            ? doneCb(item.i)
            : notDoneCb(item.i)
    })

    deleteBtn.addEventListener("click", () => {deleteCb(item.i)})

    return container
}

function itemsRender(items, {doneCb, notDoneCb, deleteCb}) {
    const container = document.createElement("ul")
    const itemsEls = items.map(item => itemRender(item, {doneCb, notDoneCb, deleteCb}))

    container.append(...itemsEls)

    return container
}

function render(items, {
    newItemCb,
    doneCb, notDoneCb, deleteCb,
    showAllCb, showDoneCb, showNotDoneCb, 
    deleteDoneCb,
    showAll, showDone,
    doneCount, notDoneCount
}) {
    const renderControls = doneCount + notDoneCount > 0

    const container = document.createElement("div")
    container.classList.add("container")

    const inputEl = inputRender(newItemCb)
    const itemsEl = itemsRender(items, {doneCb, notDoneCb, deleteCb})

    if (renderControls) {
        const controlsEl = controlsRender({showAllCb, showDoneCb, showNotDoneCb, deleteDoneCb, showAll, showDone, doneCount, notDoneCount})
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

function main(items, showAll, showDone) {
    render(
        showAll 
            ? items
            : showDone
                ? itemsDone(items)
                : itemsNotDone(items),
        {
            newItemCb: (itemLabel) => {
                main(
                    itemAppend({label: itemLabel, done: false}, items),
                    showAll, showDone
                )
            },
            doneCb: (i) => {
                main(
                    itemUpdateDone(true, i, items),
                    showAll, showDone
                )
            },
            notDoneCb: (i) => {
                main(
                    itemUpdateDone(false, i, items),
                    showAll, showDone
                )
            },
            deleteCb: (i) => {
                main(
                    itemDelete(i, items),
                    showAll, showDone
                )
            },
            showAllCb: () => {
                main(items, true, showDone)
            },
            showDoneCb: () => {
                main(items, false, true)
            }, 
            showNotDoneCb: () => {
                main(items, false, false)
            },
            deleteDoneCb: () => {
                main(itemsDeleteDone(items), showAll, showDone)
            },
            showAll, showDone,
            doneCount: itemsDone(items).length,
            notDoneCount: itemsNotDone(items).length
        }
    )
}

document.addEventListener("DOMContentLoaded", () => {
    main(
        [],
        true,
        false
    )
})