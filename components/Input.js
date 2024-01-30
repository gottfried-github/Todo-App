import EventEmitter from '../lib/event-emitter.js'
import { Component, createElement } from '../lib/helpers.js'

import Events from '../events.js'

export default class Input extends Component {
  handleSubmit = ev => {
    ev.preventDefault()

    if (!this.inputEl.value) return

    EventEmitter.emit({
      type: Events.ITEM_APPEND_ONE,
      payload: this.inputEl.value,
    })

    this.inputEl.value = ''
  }

  content = () => {
    const formEl = createElement('form', null, ['add-form'])
    const inputEl = createElement('input', null, ['add'])
    const btnEl = createElement('button', null, ['add-btn'], 'submit')

    this.inputEl = inputEl

    inputEl.setAttribute('type', 'text')
    inputEl.value = ''
    inputEl.placeholder = 'What needs to be done?'

    btnEl.addEventListener('click', this.handleSubmit)

    formEl.append(inputEl, btnEl)

    return formEl
  }
}
