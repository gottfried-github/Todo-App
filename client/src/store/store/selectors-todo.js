export default {
  selectItems: state => state.todos.items,
  selectCounters: state => state.todos.counters,
  selectFilter: state => state.todos.filter,
  selectError: state => state.todos.error,
}
