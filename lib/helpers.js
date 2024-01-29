export class Component {
  constructor() {
    this.state = new Proxy(
      {},
      {
        set: (target, propName, v) => {
          target[propName] = v
          this.render()

          return true
        },
      }
    )
  }

  render = () => {
    const elNew = this.content()

    if (!this.el) {
      this.el = elNew
      return this.el
    }

    this.el.replaceWith(elNew)
    this.el = elNew

    if (this.componentDidUpdate) this.componentDidUpdate()

    return this.el
  }
}

export function removeAll(arr, test) {
  const _arr = [...arr]

  while (_arr.find(test)) {
    _arr.splice(_arr.findIndex(test), 1)
  }

  return _arr
}

export function makeFilterCb(cb, filterActiveClass) {
  return (ev) => {
    if (ev.target.classList.contains(filterActiveClass)) return
    console.log('filter cb, ev:', ev)

    cb()
  }
}

export function createElement(tag, id, classes, textContent) {
  const el = document.createElement(tag)

  if (id) el.id = id
  if (classes?.length) el.classList.add(...classes)
  if (textContent) el.textContent = textContent

  return el
}
