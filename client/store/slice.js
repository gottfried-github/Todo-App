import { createSlice } from '@reduxjs/toolkit'

const FILTERS = [1, 2]

const slice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    itemsAll: [],
    filter: null,
    error: null,
  },
  reducers: {
    append: (state, action) => {
      state.itemsAll.push(action.payload)

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

      state.itemsAll = state.itemsAll.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.fields,
          }
        }

        return item
      })
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    deleteDone: state => {
      state.items = state.items.filter(item => item.status === 2)
    },
    setItems: (state, action) => {
      state.items = action.payload
    },
    setItemsAll: (state, action) => {
      console.log('slice, setItemsAll, action.payload:')
      state.itemsAll = action.payload
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
      if (filter === undefined || filter === state.filter) {
        return state.items.length
      }

      if (filter === null) {
        return state.itemsAll.length
      }

      if (!FILTERS.includes(filter)) {
        return new Error('todos/selectCount: invalid filter value')
      }

      return state.itemsAll.filter(item => item.status === filter).length
    },
    selectFilter: state => state.filter,
    selectError: state => state.error,
  },
})

export default slice
