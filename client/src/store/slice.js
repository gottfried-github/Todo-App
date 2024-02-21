import { createSlice } from '@reduxjs/toolkit'

import { ITEM_STATUS } from '../constants'

const slice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    counters: {
      all: 0,
      done: 0,
      notDone: 0,
    },
    filter: {
      status: null,
      sort: {
        field: 'createdAt',
        order: 1,
      },
    },
    error: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.items
      state.counters = action.payload.counters
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      }
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    append: (state, action) => {
      if (state.filter.status === null || action.payload.status === state.filter.status) {
        state.items.push(action.payload)
      }

      state.counters.all++

      if (action.payload.status === ITEM_STATUS.DONE) {
        state.counters.done++
      } else {
        state.counters.notDone++
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

      if (state.filter.status) {
        state.items = state.items.filter(item => item.status === state.filter.status)
      }

      if (action.payload.fields.status) {
        if (action.payload.fields.status === ITEM_STATUS.DONE) {
          state.counters.notDone--
          state.counters.done++
        } else {
          state.counters.done--
          state.counters.notDone++
        }
      }
    },
    deleteItem: (state, action) => {
      const item = state.items[state.items.map(item => item.id).indexOf(action.payload)]

      state.items = state.items.filter(item => item.id !== action.payload)

      state.counters.all--

      if (item.status === ITEM_STATUS.DONE) {
        state.counters.done--
      } else {
        state.counters.notDone--
      }
    },
    deleteDone: (state, action) => {
      state.items = state.items.filter(item => item.status === 2)

      state.counters.all -= action.payload.deletedCount
      state.counters.done -= action.payload.deletedCount
    },
  },
  selectors: {
    selectItems: state => {
      return state.items
    },
    selectCounters: state => {
      return state.counters
    },
    selectFilter: state => state.filter,
    selectError: state => state.error,
  },
})

export default slice
