import { createSlice } from '@reduxjs/toolkit'

const FILTERS = ['all', 'done', 'notDone']

const slice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all',
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
    setFilter: (state, action) => {
      if (!FILTERS.includes(action.payload)) {
        throw new Error('invalid filter')
      }

      state.filter = action.payload
    },
  },
  selectors: {
    selectItems: (state, filter) => {
      const _filter = filter || state.filter

      switch (_filter) {
        case 'all':
          return state.items

        case 'done':
          return state.items.filter(item => item.status === 1)

        case 'notDone':
          return state.items.filter(item => item.status === 2)

        default:
          throw new Error('invalid filter value')
      }
    },
    selectCount: (state, filter) => {
      const _filter = filter || state.filter

      switch (_filter) {
        case 'all':
          return state.items.length

        case 'done':
          return state.items.filter(item => item.status === 1).length

        case 'notDone':
          return state.items.filter(item => item.status === 2).length

        default:
          throw new Error('invalid filter value')
      }
    },
    selectFilter: state => state.filter,
  },
})

export default slice
