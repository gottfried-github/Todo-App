import { handleActions } from 'redux-actions'

import { types } from '../actions/store/team'

const reducer = handleActions(
  {
    [types.setMembers]: (state, { payload }) => {
      return { ...state, members: payload }
    },
    [types.setFreeUsers]: (state, { payload }) => {
      return { ...state, freeUsers: payload }
    },
    [types.setData]: (state, { payload }) => {
      return { ...state, data: payload }
    },
    [types.setError]: (state, { payload }) => {
      return { ...state, error: payload }
    },
    [types.appendMember]: (state, { payload }) => {
      return { ...state, members: [...state.members, payload] }
    },
    [types.deleteMember]: (state, { payload }) => {
      return { ...state, members: state.members.filter(member => member.id !== payload.id) }
    },
  },
  {
    members: [],
    freeUsers: [],
    data: null,
    error: null,
  }
)

export const selectors = {
  selectMembers: state => state.teams.members,
  selectFreeUsers: state => state.teams.freeUsers,
  selectData: state => state.teams.data,
  selectError: state => state.teams.error,
}

export default reducer
