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
      pagination: {
        page: 0,
        pageSize: 10,
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
      state.counters.all++

      if (action.payload.status === ITEM_STATUS.DONE) {
        state.counters.done++
      } else {
        state.counters.notDone++
      }

      const counter =
        state.filter.status === null
          ? state.counters.all
          : state.filter.status === ITEM_STATUS.DONE
            ? state.counters.done
            : state.counters.notDone

      if (
        counter % ((state.filter.pagination.page + 1) * state.filter.pagination.pageSize) !==
        counter
      )
        return

      if (state.filter.status === null || action.payload.status === state.filter.status) {
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
