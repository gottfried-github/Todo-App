import { Component } from 'react'

import Input from './components/Input'
import Items from './components/Items'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="heading">todo list</h1>
        <Input />
        <Items />
      </div>
    )
  }
}

export default App
