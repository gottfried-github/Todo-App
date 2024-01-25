import EventEmitter from "./lib/event-emitter.js"
import Events from "./events.js"

import Todo from "./components/todo.js"

function render() {
    const todo = new Todo().render()

    document.querySelector(".app").replaceChildren(todo)
}

/* Main */
function main() {
    EventEmitter.subscribe(Events.ITEM_APPEND_ONE, render)
    EventEmitter.subscribe(Events.ITEM_UPDATE_STATUS_ONE, render)
    EventEmitter.subscribe(Events.ITEM_DELETE_ONE, render)
    EventEmitter.subscribe(Events.ITEM_DELETE_DONE, render)
    EventEmitter.subscribe(Events.SET_FILTER, render)

    render()
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})