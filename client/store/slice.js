import { createSlice } from '@reduxjs/toolkit'

const FILTERS = [1, 2]

const slice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: null,
    error: null,
  },
  reducers: {
    append: (state, action) => {
      state.items.push(action.payload)
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

      /*
      const _filter = filter || state.filter

      switch (_filter) {
        case 'all':
          return state.items

        case 'done':
          return state.items.filter(item => item.status === 1)

        case 'notDone':
          return state.items.filter(item => item.status === 2)

        default:
          return new Error('todos/selectItems: invalid filter value')
      }
      */
    },
    selectCount: (state, filter) => {
      return 2
      /*
      const _filter = filter || state.filter

      switch (_filter) {
        case 'all':
          return state.items.length

        case 'done':
          return state.items.filter(item => item.status === 1).length

        case 'notDone':
          return state.items.filter(item => item.status === 2).length

        default:
          return new Error('todos/selectCount: invalid filter value')
      }
      */
    },
    selectFilter: state => state.filter,
    selectError: state => state.error,
  },
})

export default slice
