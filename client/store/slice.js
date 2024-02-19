import { createSlice } from '@reduxjs/toolkit'

import { ITEM_STATUS } from '../constants'

const FILTERS = [ITEM_STATUS.DONE, ITEM_STATUS.NOT_DONE]

const slice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    counters: {
      all: 0,
      done: 0,
      notDone: 0,
    },
    filter: null,
    error: null,
  },
  reducers: {
    append: (state, action) => {
      if (state.filter === null || action.payload.status === state.filter) {
        state.items.push(action.payload)
      }
    },
    updateItem: (state, action) => {
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.fields,
          }
        }

        return item
      })

      if (state.filter) {
        state.items = state.items.filter(item => item.status === state.filter)
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    deleteDone: state => {
      state.items = state.items.filter(item => item.status === 2)
    },
    setItems: (state, action) => {
      state.items = action.payload.items
      state.counters = action.payload.counters
    },
    setFilter: (state, action) => {
      if (!action.payload) {
        state.filter = null

        return
      }

      if (!FILTERS.includes(action.payload)) {
        state.error = {
          message: 'todos/setFilter: invalid filter',
        }

        return
      }

      state.filter = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  selectors: {
    selectItems: state => {
      return state.items
    },
    selectCount: (state, filter) => {
      if (filter && !FILTERS.includes(filter)) {
        return new Error('todos/selectCount: invalid filter value')
      }

      const _filter = filter === undefined ? state.filter : filter

      switch (_filter) {
        case null:
          return state.counters.all

        case ITEM_STATUS.DONE:
          return state.counters.done

        case ITEM_STATUS.NOT_DONE:
          return state.counters.notDone

        default:
          return new Error('todos/selectCount: invalid _filter')
      }

      // if (filter === undefined || filter === state.filter) {
      //   return state.items.length
      // }

      // if (filter === null) {
      //   return state.itemsAll.length
      // }

      // if (!FILTERS.includes(filter)) {
      //   return new Error('todos/selectCount: invalid filter value')
      // }

      // return state.itemsAll.filter(item => item.status === filter).length
    },
    selectFilter: state => state.filter,
    selectError: state => state.error,
  },
})

export default slice
