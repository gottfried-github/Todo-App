import { combineReducers } from 'redux'
import { type Action, handleAction, handleActions } from 'redux-actions'

import { handleActionsTyped, type UserData, type ErrorPayload } from '../types/common'
import type { StateTeam, StorePayloadUsers, StorePayloadTeam } from '../types/team'

import { types } from '../actions/team'

const members = handleActionsTyped<StorePayloadUsers, StorePayloadUsers | UserData>(
  {
    [types.storeSetMembers]: (state: StorePayloadUsers, { payload }: Action<StorePayloadUsers>) => {
      return payload
    },
    [types.storeAppendMember]: (state: StorePayloadUsers, { payload }: Action<UserData>) => {
      return [...state, payload]
    },
    [types.storeDeleteMember]: (state: StorePayloadUsers, { payload }: Action<UserData>) => {
      return state.filter(member => member.id !== payload.id)
    },
  },
  []
)

const freeUsers = handleAction(
  types.storeSetFreeUsers,
  (state: StorePayloadUsers, { payload }: Action<StorePayloadUsers>) => {
    return payload
  },
  []
)

const data = handleAction(
  types.storeSetData,
  (state: StateTeam, { payload }: Action<StorePayloadTeam>) => {
    return payload
  },
  null
)

const error = handleActions(
  {
    [types.storeSetError]: (state, { payload }: Action<ErrorPayload>) => {
      return payload
    },
    [types.storeUnsetError]: () => {
      return null
    },
  },
  null
)

export default combineReducers({
  members,
  freeUsers,
  data,
  error,
})
