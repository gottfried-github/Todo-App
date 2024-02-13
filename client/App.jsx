import { Component } from 'react'

import Items from './components/Items'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="heading">todo list</h1>
        <Items />
      </div>
    )
  }
}

export default App
