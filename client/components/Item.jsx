import { Component } from 'react'
import { connect } from 'react-redux'

import { updateStatus, updateName, deleteOne } from '../actions'

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
    const status = this.props.item.status === 1 ? 2 : 1

    this.props.updateStatus({
      id: this.props.item.id,
      status,
    })
  }

  handleDelete = () => {
    this.props.deleteOne(this.props.item.id)
  }

  handleEdit = () => {
    this.props.handleEdit(this.props.item.id)
  }

  render() {
    const labelClassName = this.props.item.status === 1 ? 'checked' : ''

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
              defaultValue={this.props.item.name}
              onKeyUp={this.handleNameChange}
            />
          ) : (
            <label className={labelClassName} htmlFor={this.props.item.id}>
              {this.props.item.name}
            </label>
          )}
        </div>
        <button className="edit" onClick={this.handleEdit}>
          edit
        </button>
        <button className="delete" onClick={this.handleDelete}>
          delete
        </button>
      </li>
    )
  }
}

export default connect(null, {
  updateStatus,
  updateName,
  deleteOne,
})(Item)
