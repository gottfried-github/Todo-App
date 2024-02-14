import { Component } from 'react'
import { connect } from 'react-redux'

import { getItems, deleteDone } from '../actions'
import slice from '../store/slice'

import { ITEM_STATUS } from '../constants'

class Controls extends Component {
  filterActiveClass = 'active'

  componentDidMount() {
    this.props.getItems()
    this.props.getItems({ status: this.props.filter })
  }

  handleDeleteDone = () => {
    this.props.deleteDone()
  }

  handleSetFilter = (ev, filter) => {
    if (ev.target.classList.contains(this.filterActiveClass)) return

    this.props.getItems({ status: filter })
  }

  render() {
    if (!this.props.count(null)) return null

    return (
      <div className="controls">
        <div>
          <span className="counter">{`${this.props.count(ITEM_STATUS.DONE)} completed`}</span>
          {', '}
          <span className="counter">{`${this.props.count(ITEM_STATUS.NOT_DONE)} left`}</span>
        </div>
        <div className="filters">
          <button
            className={`filter${this.props.filter === null ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, null)
            }}
          >
            all
          </button>
          <button
            className={`filter${this.props.filter === ITEM_STATUS.DONE ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, ITEM_STATUS.DONE)
            }}
          >
            completed
          </button>
          <button
            className={`filter${this.props.filter === ITEM_STATUS.NOT_DONE ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, ITEM_STATUS.NOT_DONE)
            }}
          >
            active
          </button>
        </div>
        <button className="delete-done" onClick={this.handleDeleteDone}>
          clear completed
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const store = { [slice.reducerPath]: state }

  return {
    count: filter => slice.selectors.selectCount(store, filter),
    filter: slice.selectors.selectFilter(store),
  }
}

export default connect(mapStateToProps, { getItems, deleteDone })(Controls)
