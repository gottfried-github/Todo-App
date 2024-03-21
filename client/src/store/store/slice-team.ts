import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { types } from '../actions/store/team'

const members = handleActions(
  {
    [types.setMembers]: (state, { payload }) => {
      return payload
    },
    [types.appendMember]: (state, { payload }) => {
      return [...state, payload]
    },
    [types.deleteMember]: (state, { payload }) => {
      return state.filter(member => member.id !== payload.id)
    },
  },
  []
)

const freeUsers = handleAction(
  types.setFreeUsers,
  (state, { payload }) => {
    return payload
  },
  []
)

const data = handleAction(
  types.setData,
  (state, { payload }) => {
    return payload
  },
  null
)

const error = handleActions(
  {
    [types.setError]: (state, { payload }) => {
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
