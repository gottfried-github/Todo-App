import { combineReducers } from 'redux'
import { type Action, handleAction, handleActions } from 'redux-actions'

import { handleActionsTyped, type ErrorPayload } from '../types/common'

import type {
  StorePayloadItem,
  StorePayloadItems,
  StorePayloadFilter,
  StorePayloadCounters,
  StateItems,
  StateFilter,
  StateCounters,
  StateError,
} from '../types/todo'

import { types } from '../actions/todo'
import { ITEM_STATUS } from '../../constants'

const items = handleActionsTyped<StateItems, StorePayloadItems | StorePayloadItem>(
  {
    [types.storeSetItems]: (state: StateItems, { payload }: Action<StorePayloadItems>) => {
      return payload
    },
    [types.storeAppend]: (state: StateItems, { payload }: Action<StorePayloadItem>) => {
      if (!payload.counters || !payload.filter) {
        return state
      }

      const counters = { ...payload.counters }

      counters.all++

      if (payload.item.status === ITEM_STATUS.DONE) {
        counters.done++
      } else {
        counters.notDone++
      }

      let counter = null

      if (payload.filter.status === null) {
        counter = counters.all
      } else if (payload.filter.status === ITEM_STATUS.DONE) {
        counter = counters.done
      } else {
        counter = counters.notDone
      }

      // whether the new item fits into the current page
      if (
        ![0, counter].includes(
          counter % ((payload.filter.pagination.page + 1) * payload.filter.pagination.pageSize)
        )
      )
        return state

      if (payload.filter.status === null || payload.item.status === payload.filter.status) {
        return [...state, payload.item]
      }

      return state
    },
    [types.storeUpdateItem]: (state: StateItems, { payload }: Action<StorePayloadItem>) => {
      if (!payload.filter) {
        return state
      }

      let stateNew = state.map(item => {
        if (item.id === payload.item.id) {
          return payload.item
        }

        return item
      })

      if (payload.filter.status) {
        stateNew = stateNew.filter(item => {
          if (!payload.filter) return true

          item.status === payload.filter.status
        })
      }

      return stateNew
    },
    [types.storeDeleteItem]: (state: StateItems, { payload }: Action<StorePayloadItem>) => {
      return state.filter(item => item.id !== payload.item.id)
    },
  },
  []
)

const counters = handleActionsTyped<StateCounters, StorePayloadCounters | StorePayloadItem>(
  {
    [types.storeSetCounters]: (state: StateCounters, { payload }: Action<StorePayloadCounters>) => {
      return payload
    },
    [types.storeAppend]: (state: StateCounters, { payload }: Action<StorePayloadItem>) => {
      const stateNew: StateCounters = { ...state }

      stateNew.all++

      if (payload.item.status === ITEM_STATUS.DONE) {
        stateNew.done++
      } else {
        stateNew.notDone++
      }

      return stateNew
    },
    [types.storeUpdateItem]: (state: StateCounters, { payload }: Action<StorePayloadItem>) => {
      const stateNew = { ...state }

      const itemPrev = payload.itemsPrev?.find(item => item.id === payload.item.id)

      if (itemPrev?.status === payload.item.status) return stateNew

      if (payload.item.status === ITEM_STATUS.DONE) {
        stateNew.notDone--
        stateNew.done++
      } else {
        stateNew.done--
        stateNew.notDone++
      }

      return stateNew
    },
    [types.storeDeleteItem]: (state: StateCounters, { payload }: Action<StorePayloadItem>) => {
      const stateNew = { ...state }
      stateNew.all--

      if (payload.item.status === ITEM_STATUS.DONE) {
        stateNew.done--
      } else {
        stateNew.notDone--
      }

      return stateNew
    },
  },
  {
    all: 0,
    done: 0,
    notDone: 0,
  }
)

const filter = handleActions(
  {
    [types.storeSetFilter]: (state: StateFilter, { payload }: Action<StorePayloadFilter>) => {
      return {
        ...state,
        ...payload,
      }
    },
  },
  {
    status: null,
    sort: {
      field: 'createdAt',
      order: 1,
    },
    pagination: {
      page: 0,
      pageSize: 10,
    },
  }
)

const error = handleAction(
  types.storeSetError,
  (state: StateError, { payload }: Action<null | ErrorPayload>) => {
    return payload
  },
  null
)

export default combineReducers({
  items,
  filter,
  counters,
  error,
})
