import './index.html'
import './index.css'

import Main from './components/Main'

function render() {
  const todo = new Main().render()

  document.querySelector('.app').replaceChildren(todo)
}

/* Main */
function main() {
  render()
}

document.addEventListener('DOMContentLoaded', () => {
  main()
})
