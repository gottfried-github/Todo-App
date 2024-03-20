import { createAction } from 'redux-actions'

export const types = {
  setMembers: 'storeTeam/setMembers',
  setFreeUsers: 'storeTeam/setFreeUsers',
  setData: 'storeTeam/setData',
  setError: 'storeTeam/setError',
  unsetError: 'storeTeam/unsetError',
  appendMember: 'storeTeam/appendMember',
  deleteMember: 'storeTeam/deleteMember',
}

export const creators = {
  setMembers: createAction(types.setMembers),
  setFreeUsers: createAction(types.setFreeUsers),
  setData: createAction(types.setData),
  setError: createAction(types.setError),
  unsetError: createAction(types.unsetError),
  appendMember: createAction(types.appendMember),
  deleteMember: createAction(types.deleteMember),
}
