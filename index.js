import EventEmitter from "./lib/event-emitter.js"
import Events from "./events.js"

import Todo from "./components/todo.js"

function render() {
    const todo = new Todo().el

    document.querySelector(".app").replaceChildren(todo)
}

/* Main */
function main() {
    render()
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})