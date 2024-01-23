function itemUpdateDone(done, i, items) {
    return items.map((item, _i) => 
        i === _i 
            ? {...item, done}
            : item
    )
}

function itemsActive(items) {
    return items.reduce((itemsActive, item, _i) => {
        if (item.done) return itemsActive

        itemsActive.push({
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

function main() {

}