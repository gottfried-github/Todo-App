export function removeAll(arr, test) {
    const _arr = [...arr]

    while (_arr.find(test)) {
        _arr.splice(_arr.findIndex(test), 1)
    }

    return _arr
}