import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { type UserData, type ErrorPayload } from '../actions/types'
import { types, type Users, type Team as TeamPayload } from '../actions/store/team'

type Team = null | TeamPayload
type ErrorState = null | ErrorPayload

const members = handleActions<Users, any>(
  {
    [types.setMembers]: (state: Users, { payload }: { payload: Users }) => {
      return payload
    },
    [types.appendMember]: (state: Users, { payload }: { payload: UserData }) => {
      return [...state, payload]
    },
    [types.deleteMember]: (state: Users, { payload }: { payload: UserData }) => {
      return state.filter(member => member.id !== payload.id)
    },
  },
  []
)

const freeUsers = handleAction(
  types.setFreeUsers,
  (state: Users, { payload }: { payload: Users }) => {
    return payload
  },
  []
)

const data = handleAction(
  types.setData,
  (state: Team, { payload }: { payload: Team }) => {
    return payload
  },
  null
)

const error = handleActions(
  {
    [types.setError]: (state: ErrorState, { payload }: { payload: ErrorState }) => {
      return payload
    },
    [types.unsetError]: () => {
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
