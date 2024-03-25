import { handleActions } from 'redux-actions'

import { type ErrorPayload } from '../actions/types'
import { types, type Item, type ItemUpdate, type Items, type Filter } from '../actions/store/todo'

import { ITEM_STATUS } from '../../constants'

type SliceTodo = {
  items: Item[]
  counters: {
    all: number
    done: number
    notDone: number
  }
  filter: {
    status: null | number
    sort: {
      field: string
      order: number
    }
    pagination: {
      page: number
      pageSize: number
    }
  }
  error: null | ErrorPayload
}

const reducer = handleActions<SliceTodo, any>(
  {
    [types.setItems]: (state: SliceTodo, { payload }: { payload: Items }) => {
      return {
        ...state,
        items: payload.items,
        counters: payload.counters,
      }
    },
    [types.setFilter]: (state: SliceTodo, { payload }: { payload: Filter }) => {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...payload,
        },
      }
    },
    [types.setError]: (state: SliceTodo, { payload }: { payload: ErrorPayload }) => {
      return { ...state, error: payload }
    },
    [types.append]: (state: SliceTodo, { payload }: { payload: Item }) => {
      const stateNew = {
        counters: { ...state.counters },
        items: [...state.items],
      }

      stateNew.counters.all++

      if (payload.status === ITEM_STATUS.DONE) {
        stateNew.counters.done++
      } else {
        stateNew.counters.notDone++
      }

      let counter = null

      if (state.filter.status === null) {
        counter = stateNew.counters.all
      } else if (state.filter.status === ITEM_STATUS.DONE) {
        counter = stateNew.counters.done
      } else {
        counter = stateNew.counters.notDone
      }

      // whether the new item fits into the current page
      if (
        ![0, counter].includes(
          counter % ((state.filter.pagination.page + 1) * state.filter.pagination.pageSize)
        )
      )
        return { ...state, ...stateNew }

      if (state.filter.status === null || payload.status === state.filter.status) {
        stateNew.items.push(payload)
      }

      return { ...state, ...stateNew }
    },
    [types.updateItem]: (state: SliceTodo, { payload }: { payload: ItemUpdate }) => {
      const stateNew: {
        items?: Item[]
        counters?: {
          all: number
          done: number
          notDone: number
        }
      } = {}

      stateNew.items = state.items.map(item => {
        if (item.id === payload.id) {
          return {
            ...item,
            ...payload.fields,
          }
        }

        return item
      })

      if (state.filter.status) {
        stateNew.items = stateNew.items.filter(item => item.status === state.filter.status)
      }

      if (payload.fields.status) {
        stateNew.counters = { ...state.counters }

        if (payload.fields.status === ITEM_STATUS.DONE) {
          stateNew.counters.notDone--
          stateNew.counters.done++
        } else {
          stateNew.counters.done--
          stateNew.counters.notDone++
        }
      }

      return { ...state, ...stateNew }
    },
    [types.deleteItem]: (state: SliceTodo, { payload }: { payload: Item }) => {
      const stateNew: {
        items?: Item[]
        counters: {
          all: number
          done: number
          notDone: number
        }
      } = {
        counters: { ...state.counters },
      }

      stateNew.items = state.items.filter(item => item.id !== payload.id)
      stateNew.counters.all--

      if (payload.status === ITEM_STATUS.DONE) {
        stateNew.counters.done--
      } else {
        stateNew.counters.notDone--
      }

      return { ...state, ...stateNew }
    },
  },
  {
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
  }
)

export default reducer
