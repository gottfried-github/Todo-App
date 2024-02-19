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
    selectCounters: state => {
      return state.counters
    },
    selectFilter: state => state.filter,
    selectError: state => state.error,
  },
})

export default slice
