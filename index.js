import Main from "./components/Main.js"

function render() {
  const todo = new Main().render()
  
  document.querySelector(".app").replaceChildren(todo)
}

/* Main */
function main() {
  render()
}

document.addEventListener("DOMContentLoaded", () => {
  main()
})