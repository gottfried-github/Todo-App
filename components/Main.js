import { Component, createElement } from '../lib/helpers.js'

import Input from './Input.js'
import Items from './Items.js'
import Controls from './Controls.js'

export default class Main extends Component {
  constructor() {
    super()

    this.input = new Input()
    this.items = new Items()
    this.controls = new Controls()
  }

  content = () => {
    const container = createElement('div', null, ['container'])

    const title = createElement('h1', null, ['heading'], 'todo list')

    container.append(title, this.input.render(), this.controls.render(), this.items.render())

    return container
  }
}
