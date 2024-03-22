import { type State } from './store'

export default {
  selectItems: (state: State) => state.todos.items,
  selectCounters: (state: State) => state.todos.counters,
  selectFilter: (state: State) => state.todos.filter,
  selectError: (state: State) => state.todos.error,
}
