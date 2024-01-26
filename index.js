import EventEmitter from "./lib/event-emitter.js"
import Events from "./events.js"

import Todo from "./components/todo.js"

function render() {
    const todo = new Todo().render()

    document.querySelector(".app").replaceChildren(todo)
}

/* Main */
function main() {
    EventEmitter.subscribe(Events.STORAGE_UPDATED, render)

    render()
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})