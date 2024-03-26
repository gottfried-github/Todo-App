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

export type Item = {
  id: string
  name: string
  status: number
  user: {
    id: string
    userName: string
  }
  createdAt: Date
  updatedAt: Date
}

export type ItemUpdate = {
  id: string
  fields: {
    name?: string
    status?: number
  }
}

export type Items = {
  counters: {
    all: number
    done: number
    notDone: number
  }
  items: Item[]
}

export type Filter = {
  status?: null | number
  sort?: {
    field: string
    order: number
  }
  pagination?: {
    page: number
    pageSize: number
  }
}
