import EventEmitter from '../lib/event-emitter'
import Store from '../store/store'
import { Component, createElement } from '../lib/helpers'

import Events from '../events'

export default class Counters extends Component {
  constructor() {
    super()

    EventEmitter.subscribe(Events.STORAGE_UPDATED, this.render)
  }

  content = () => {
    const counterClass = 'counter'

    const container = createElement('div')
    const doneEl = createElement(
      'span',
      null,
      [counterClass],
      `${Store.getCount('done')} completed`
    )
    const notDoneEl = createElement(
      'span',
      null,
      [counterClass],
      `${Store.getCount('notDone')} left`
    )

    container.append(doneEl, ', ', notDoneEl)

    return container
  }
}
