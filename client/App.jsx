import { Component } from 'react'

import Input from './components/Input'
import Controls from './components/Controls'
import Items from './components/Items'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="heading">todo list</h1>
        <Input />
        <Controls />
        <Items />
      </div>
    )
  }
}

export default App
