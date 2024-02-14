import { Component } from 'react'
import { connect } from 'react-redux'

import { getItems, deleteDone } from '../actions'
import slice from '../store/slice'

class Controls extends Component {
  filterActiveClass = 'active'

  componentDidMount() {
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
            className={`filter${this.props.filter === null ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, null)
            }}
          >
            all
          </button>
          <button
            className={`filter${this.props.filter === 1 ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, 1)
            }}
          >
            completed
          </button>
          <button
            className={`filter${this.props.filter === 2 ? ` ${this.filterActiveClass}` : ''}`}
            onClick={ev => {
              this.handleSetFilter(ev, 2)
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
