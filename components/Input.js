import EventEmitter from '../lib/event-emitter.js'
import { Component, createElement } from '../lib/helpers.js'

import Events from '../events.js'

export default class Input extends Component {
  constructor() {
    super()

    this.isInputFocused = false

    this.state.value = ''
  }

  handleInputChange = (ev) => {
    this.isInputFocused = document.hasFocus(ev.target)

    this.state.value = ev.target.value
  }

  handleInputBlur = () => {
    this.isInputFocused = false
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    if (!this.state.value.length) return

    EventEmitter.emit({
      type: Events.ITEM_APPEND_ONE,
      payload: this.state.value,
    })

    this.state.value = ''
  }

  componentWillUpdate() {
    this.inputEl.removeEventListener('blur', this.handleInputBlur)
  }

  componentDidUpdate() {
    if (this.isInputFocused) {
      this.inputEl.focus()
    }
  }

  content = () => {
    const formEl = createElement('form', null, ['add-form'])
    const inputEl = createElement('input', null, ['add'])
    const btnEl = createElement('button', null, ['add-btn'], 'submit')

    this.inputEl = inputEl

    inputEl.setAttribute('type', 'text')
    inputEl.value = this.state.value
    inputEl.placeholder = 'What needs to be done?'

    inputEl.addEventListener('input', this.handleInputChange)
    inputEl.addEventListener('blur', this.handleInputBlur)
    btnEl.addEventListener('click', this.handleSubmit)

    formEl.append(inputEl, btnEl)

    return formEl
  }
}
