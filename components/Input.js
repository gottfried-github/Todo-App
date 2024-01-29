import EventEmitter from '../lib/event-emitter.js'
import { Component, createElement } from '../lib/helpers.js'

import Events from '../events.js'

export default class Input extends Component {
  constructor() {
    super()

    this.value = ''
    this.state.value = ''
  }

  handleInputChange = (ev) => {
    this.value = ev.target.value
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    if (!this.value.length) return

    EventEmitter.emit({
      type: Events.ITEM_APPEND_ONE,
      payload: this.value,
    })

    this.value = ''
    this.state.value = ''
  }

  content = () => {
    const formEl = createElement('form', null, ['add-form'])
    const inputEl = createElement('input', null, ['add'])
    const btnEl = createElement('button', null, ['add-btn'], 'submit')

    inputEl.setAttribute('type', 'text')
    inputEl.value = this.state.value
    inputEl.placeholder = 'What needs to be done?'

    inputEl.addEventListener('input', this.handleInputChange)
    btnEl.addEventListener('click', this.handleSubmit)

    formEl.append(inputEl, btnEl)

    return formEl
  }
}
