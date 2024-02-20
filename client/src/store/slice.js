import { createSlice } from '@reduxjs/toolkit'

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
