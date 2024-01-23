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
    ].map((item, i) => ({i, item})),
    true,
    false
)