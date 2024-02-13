import { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../store/sagas'

class Input extends Component {
  state = {
    name: '',
  }

  handleInputChange = ev => {
    this.setState({ name: ev.target.value })
  }

  handleSubmit = ev => {
    ev.preventDefault()

    this.props.create(this.state.name)

    this.setState({ name: '' })
  }

  render() {
    return (
      <form className="add-form">
        <input
          className="add"
          type="text"
          placeholder="What needs to be done?"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <button className="add-btn" onClick={this.handleSubmit}>
          submit
        </button>
      </form>
    )
  }
}

export default connect(null, {
  create: actions.create,
})(Input)
