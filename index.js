function itemUpdateDone(done, i, items) {
    return items.map((item, _i) => 
        i === _i 
            ? {...item, done}
            : item
    )
}

function itemsDeleteDone(items) {
    return items.reduce((itemsNotDone, item) => {
        if (item.done) return itemsNotDone

        itemsNotDone.push({...item})
    }, [])
}

function itemsNotDone(items) {
    return items.reduce((itemsNotDone, item, _i) => {
        if (item.done) return itemsNotDone

        itemsNotDone.push({
            i: _i, item: {...item}
        })
    }, [])
}

function itemsDone(items) {
    return items.reduce((itemsDone, item, _i) => {
        if (!item.done) return itemsDone

        itemsDone.push({
            i: _i, item: {...item}
        })
    }, [])
}

function itemsFormat(items) {
    return items.map((item, i) => ({i, item: {...item}}))
}

function itemRender(item, {doneCb, notDoneCb}) {
    // doneCb(item.i)
    // notDoneCb(item.i)
}

function itemsRender(items, {
    doneCb, notDoneCb, 
    showDoneCb, showNotDoneCb, 
    deleteDoneCb
}) {
    
}

function main() {
    let items = [
        {
            done: false,
            title: "item 0"
        },
        {
            done: true,
            title: "item 1"
        },
        {
            done: true,
            title: "item 2"
        },
        {
            done: false,
            title: "item 3"
        }
    ]

    let showAll = true
    let showDone = null

    itemsRender(itemsFormat(items), {
        doneCb: (i) => {
            items = itemUpdateDone(true, i, items)

            if (null === showDone) throw new Error()

            itemsRender(
                showAll 
                    ? itemsFormat(items)
                    : showDone
                        ? itemsDone(items)
                        : itemsNotDone(items)
            )
        },
        notDoneCb: () => {
            items = itemUpdateDone(true, i, items)

            itemsRender(itemsFormat)
        },
        showDoneCb: () => {
            showAll = false
            showDone = true

            itemsRender(itemsDone(items))
        }, 
        showNotDoneCb: () => {
            showAll = false
            showDone = false

            itemsRender(itemsNotDone(items))
        },
        deleteDoneCb: () => {
            items = itemsDeleteDone(items)

            if (null === showDone) throw new Error()

            itemsRender(
                showAll 
                    ? itemsFormat(items)
                    : showDone
                        ? itemsDone(items)
                        : itemsNotDone(items)
            )
        }, 
    })
}