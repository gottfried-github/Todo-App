import { createAction } from 'redux-actions'

export const types = {
  setItems: 'storeTodo/setItems',
  setFilter: 'storeTodo/setFilter',
  setError: 'storeTodo/setError',
  append: 'storeTodo/append',
  updateItem: 'storeTodo/updateItem',
  deleteItem: 'storeTodo/deleteItem',
}

export const creators = {
  setItems: createAction(types.setItems),
  setFilter: createAction(types.setFilter),
  setError: createAction(types.setError),
  append: createAction(types.append),
  updateItem: createAction(types.updateItem),
  deleteItem: createAction(types.deleteItem),
}
