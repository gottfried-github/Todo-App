import { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../store/sagas'

class Item extends Component {
  handleNameChange = ev => {
    // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
    if (ev.isComposing || ev.code !== 'Enter') return

    this.props.updateName({
      id: this.props.item.id,
      name: ev.target.value,
    })

    this.props.handleEdit(this.props.item.id)
  }

  handleStatusChange = () => {
    let status = null

    if (this.props.item.status === 1) {
      status = 2
    } else {
      status = 1
    }

    this.props.updateStatus({
      id: this.props.item.id,
      status,
    })
  }

  render() {
    let labelClassName = null

    if (this.props.item.status === 1) {
      labelClassName = 'checked'
    } else {
      labelClassName = ''
    }

    return (
      <li className="item">
        <div className="input-container">
          <input
            id={this.props.item.id}
            className="input-checkbox"
            type="checkbox"
            checked={this.props.item.status === 1}
            onChange={this.handleStatusChange}
          />
          {this.props.isEditing ? (
            <input
              className="input-edit"
              type="text"
              value={this.props.item.name}
              onKeyUp={this.handleNameChange}
            />
          ) : (
            <label className={labelClassName} htmlFor={this.props.item.id}>
              {this.props.item.name}
            </label>
          )}
        </div>
      </li>
    )
  }
}

export default connect(null, {
  updateStatus: actions.updateStatus,
  updateName: actions.updateName,
  deleteOne: actions.deleteOne,
})(Item)
