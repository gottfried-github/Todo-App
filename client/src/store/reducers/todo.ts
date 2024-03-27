import { handleActions } from 'redux-actions'

import { type ErrorPayload } from '../types/common'
import { types } from '../actions/todo'
import {
  type StorePayloadItem,
  type StorePayloadItemUpdate,
  type StorePayloadItems,
  type StorePayloadFilter,
  type StateTodo,
} from '../types/todo'

import { ITEM_STATUS } from '../../constants'

const reducer = handleActions<StateTodo, any>(
  {
    [types.storeSetItems]: (state: StateTodo, { payload }: { payload: StorePayloadItems }) => {
      return {
        ...state,
        items: payload.items,
        counters: payload.counters,
      }
    },
    [types.storeSetFilter]: (state: StateTodo, { payload }: { payload: StorePayloadFilter }) => {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...payload,
        },
      }
    },
    [types.storeSetError]: (state: StateTodo, { payload }: { payload: ErrorPayload }) => {
      return { ...state, error: payload }
    },
    [types.storeAppend]: (state: StateTodo, { payload }: { payload: StorePayloadItem }) => {
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
    [types.storeUpdateItem]: (
      state: StateTodo,
      { payload }: { payload: StorePayloadItemUpdate }
    ) => {
      const stateNew: {
        items?: StorePayloadItem[]
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
    [types.storeDeleteItem]: (state: StateTodo, { payload }: { payload: StorePayloadItem }) => {
      const stateNew: {
        items?: StorePayloadItem[]
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
