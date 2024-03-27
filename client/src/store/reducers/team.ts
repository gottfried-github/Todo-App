import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { type UserData, type ErrorPayload } from '../types/common'
import { types } from '../actions/team'
import { type StorePayloadUsers, type StorePayloadTeam } from '../types/team'

type Team = null | StorePayloadTeam
type ErrorState = null | ErrorPayload

const members = handleActions<StorePayloadUsers, any>(
  {
    [types.storeSetMembers]: (
      state: StorePayloadUsers,
      { payload }: { payload: StorePayloadUsers }
    ) => {
      return payload
    },
    [types.storeAppendMember]: (state: StorePayloadUsers, { payload }: { payload: UserData }) => {
      return [...state, payload]
    },
    [types.storeDeleteMember]: (state: StorePayloadUsers, { payload }: { payload: UserData }) => {
      return state.filter(member => member.id !== payload.id)
    },
  },
  []
)

const freeUsers = handleAction(
  types.storeSetFreeUsers,
  (state: StorePayloadUsers, { payload }: { payload: StorePayloadUsers }) => {
    return payload
  },
  []
)

const data = handleAction(
  types.storeSetData,
  (state: Team, { payload }: { payload: Team }) => {
    return payload
  },
  null
)

const error = handleActions(
  {
    [types.storeSetError]: (state: ErrorState, { payload }: { payload: ErrorState }) => {
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
