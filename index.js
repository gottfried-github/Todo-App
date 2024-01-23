/*
    deal with items data
*/
function itemUpdateDone(done, i, items) {
    return items.map((item) => 
        i === item.i
            ? {...item, item: {...item, done}}
            : item
    )
}

function itemsDeleteDone(items) {
    return items.reduce((itemsNotDone, item) => {
        if (item.item.done) return itemsNotDone

        itemsNotDone.push({...item})

        return itemsNotDone
    }, [])
}

function itemsNotDone(items) {
    return items.reduce((itemsNotDone, item) => {
        if (item.done) return itemsNotDone

        itemsNotDone.push({...item})

        return itemsNotDone
    }, [])
}

function itemsDone(items) {
    return items.reduce((itemsDone, item) => {
        if (!item.done) return itemsDone

        itemsDone.push({...item})

        return itemsDone
    }, [])
}

/*
    Render items
*/
function makeFilterCb(cb, filterActiveClass) {
    return (ev) => {
        if (ev.target.classList.contains(filterActiveClass)) return

        cb()
    }
}

function controlsRender({showAllCb, showDoneCb, showNotDoneCb, deleteDoneCb, showAll, showDone}) {
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

    deleteDoneEl.addEventListener("click", deleteDoneCb)
    showAllEl.addEventListener("click", makeFilterCb(showAllCb, filterActiveClass))
    showDoneEl.addEventListener("click", makeFilterCb(showDoneCb, filterActiveClass))
    showNotDoneEl.addEventListener("click", makeFilterCb(showNotDoneCb, filterActiveClass))

    container.append(deleteDoneEl, showAllEl, showDoneEl, showNotDoneEl)

    return container
}

function itemRender(item, {doneCb, notDoneCb}) {
    const container = document.createElement("li")
    const input = document.createElement("input")
    const label = document.createElement("label")

    input.setAttribute("type", "checkbox")
    input.id = item.i.toString()
    label.setAttribute("for", input.id)

    label.innerText = item.item.label

    container.append(input, label)
    
    container.addEventListener("click", (ev) => {
        ev.currentTarget.querySelector('input').checked
            ? doneCb(item.i)
            : notDoneCb(item.i)
    })

    return container
}

function itemsRender(items, {doneCb, notDoneCb}) {
    const container = document.createElement("ul")
    const itemsEls = items.map(item => itemRender(item, {doneCb, notDoneCb}))

    container.append(...itemsEls)

    return container
}

function render(items, {
    doneCb, notDoneCb, 
    showAllCb, showDoneCb, showNotDoneCb, 
    deleteDoneCb,
    showAll, showDone
}) {
    const container = document.createElement("div")
    container.classList.add("container")

    const controlsEl = controlsRender({showAllCb, showDoneCb, showNotDoneCb, deleteDoneCb, showAll, showDone})
    const itemsEl = itemsRender(items, {doneCb, notDoneCb})

    container.append(controlsEl, itemsEl)

    const containerPrev = document.querySelector(".container")

    if (containerPrev) {
        containerPrev.replace(container)
    } else {
        document.querySelector(".app").appendChild(container)
    }
}

function main(items, showAll, showDone) {
    itemsRender(
        showAll 
            ? items
            : showDone
                ? itemsDone(items)
                : itemsNotDone(items),
        {
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
        }
    )
}

main(
    [
        {
            done: false,
            label: "item 0"
        },
        {
            done: true,
            label: "item 1"
        },
        {
            done: true,
            label: "item 2"
        },
        {
            done: false,
            label: "item 3"
        }
    ].map((item, i) => ({i, item})),
    true,
    false
)