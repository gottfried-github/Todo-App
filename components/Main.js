import {Component, createElement} from "../lib/helpers.js"

import Input from "./Input.js"
import Items from "./Items.js"
import Controls from "./Controls.js"

export default class Main extends Component {
  constructor() {
    super()
    
    this.input = new Input()
    this.items = new Items()
    this.controls = new Controls()
  }
  
  content = () => {
    const container = createElement("div", null, ["container"])
    
    container.append(this.input.render(), this.controls.render(), this.items.render())
    
    return container
  }
}