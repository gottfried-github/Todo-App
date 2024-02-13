import { Component } from 'react'
import { connect } from 'react-redux'

import slice from './store/slice'

import Form from './components/Form'
import Controls from './components/Controls'
import Items from './components/Items'

class App extends Component {
  render() {
    if (this.props.error) {
      alert(this.props.error.message)
    }

    return (
      <div className="container">
        <h1 className="heading">todo list</h1>
        <Form />
        <Controls />
        <Items />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const store = { [slice.reducerPath]: state }

  return {
    error: slice.selectors.selectError(store),
  }
}

export default connect(mapStateToProps)(App)
