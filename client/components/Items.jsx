import { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../store/sagas'
import slice from '../store/slice'

import Item from './Item'

class Items extends Component {
  state = {
    editingId: null,
  }

  handleEdit = itemId => {
    if (!this.state.editingId || this.state.editingId !== itemId) {
      this.setState({
        editingId: itemId,
      })
    } else {
      this.setState({
        editingId: null,
      })
    }
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    return (
      <ul className="items">
        {this.props.items.map(item => (
          <Item
            key={item.id}
            item={item}
            isEditing={this.state.editingId === item.id}
            handleEdit={this.handleEdit}
          />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  const store = { [slice.reducerPath]: state }

  return {
    items: slice.selectors.selectItems(store),
    filter: slice.selectors.selectFilter(store),
  }
}

export default connect(mapStateToProps, { fetchItems: actions.getItems })(Items)
