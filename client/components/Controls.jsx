import { Component } from 'react'
import { connect } from 'react-redux'

import { deleteDone } from '../actions'
import slice from '../store/slice'

class Controls extends Component {
  filterActiveClass = 'active'

  handleDeleteDone = () => {
    this.props.deleteDone()
  }

  handleSetFilter = (ev, filter) => {
    if (ev.target.classList.contains(this.filterActiveClass)) return

    this.props.setFilter(filter)
  }

  render() {
    if (!this.props.count('all')) return null

    return (
      <div className="controls">
        <div>
          <span className="counter">{`${this.props.count('done')} completed`}</span>
          {', '}
          <span className="counter">{`${this.props.count('notDone')} left`}</span>
        </div>
        <div className="filters">
          <button
            className={`filter${this.props.filter === 'all' ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, 'all')
            }}
          >
            all
          </button>
          <button
            className={`filter${this.props.filter === 'done' ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, 'done')
            }}
          >
            completed
          </button>
          <button
            className={`filter${this.props.filter === 'notDone' ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, 'notDone')
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

export default connect(mapStateToProps, {
  setFilter: slice.actions.setFilter,
  deleteDone,
})(Controls)
