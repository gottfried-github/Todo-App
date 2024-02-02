import EventEmitter from '../utils/event-emitter'
import Store from '../store/store'
import { Component, createElement } from '../utils/helpers'

import Events from '../events'

import Counters from './Counters'

export default class Controls extends Component {
  constructor() {
    super()

    this.counters = new Counters()
    this.filterActiveClass = 'active'

    EventEmitter.subscribe(Events.STORAGE_UPDATED, this.render)
  }

  handleDeleteDone = () => {
    EventEmitter.emit({ type: Events.ITEM_DELETE_DONE })
  }

  handleShow = (ev, filter) => {
    if (ev.target.classList.contains(this.filterActiveClass)) return

    EventEmitter.emit({
      type: Events.SET_FILTER,
      payload: filter,
    })
  }

  content = () => {
    if (!Store.getCount('all')) return createElement('div')

    const container = createElement('div', null, ['controls'])
    const containerFilters = createElement('div', null, ['filters'])

    const filterClass = 'filter'

    const deleteDoneEl = createElement('button', null, ['delete-done'], 'clear completed')
    const showAllEl = createElement('button', null, [filterClass], 'all')
    const showDoneEl = createElement('button', null, [filterClass], 'completed')
    const showNotDoneEl = createElement('button', null, [filterClass], 'active')

    if ('all' === Store.getFilter()) {
      showAllEl.classList.add(this.filterActiveClass)
    } else if ('done' === Store.getFilter()) {
      showDoneEl.classList.add(this.filterActiveClass)
    } else {
      showNotDoneEl.classList.add(this.filterActiveClass)
    }

    deleteDoneEl.addEventListener('click', this.handleDeleteDone)
    showAllEl.addEventListener('click', ev => {
      this.handleShow(ev, 'all')
    })
    showDoneEl.addEventListener('click', ev => {
      this.handleShow(ev, 'done')
    })
    showNotDoneEl.addEventListener('click', ev => {
      this.handleShow(ev, 'notDone')
    })

    containerFilters.append(showAllEl, showDoneEl, showNotDoneEl)
    container.append(this.counters.render(), containerFilters, deleteDoneEl)

    return container
  }
}
