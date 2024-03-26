import { type RootState } from './store'

export default {
  selectItems: (state: RootState) => state.todos.items,
  selectCounters: (state: RootState) => state.todos.counters,
  selectFilter: (state: RootState) => state.todos.filter,
  selectError: (state: RootState) => state.todos.error,
}
