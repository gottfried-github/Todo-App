import { createAction } from 'redux-actions'

export const types = {
  sagaCreate: 'sagaTeam/create',
  sagaAddUser: 'sagaTeam/addUser',
  sagaDeleteUser: 'sagaTeam/deleteUser',
  sagaGetTeam: 'sagaTeam/getTeam',
  sagaGetFreeUsers: 'sagaTeam/getFreeUsers',
  sagaDeleteTeam: 'sagaTeam/delete',

  storeSetMembers: 'storeTeam/setMembers',
  storeSetFreeUsers: 'storeTeam/setFreeUsers',
  storeSetData: 'storeTeam/setData',
  storeSetError: 'storeTeam/setError',
  storeUnsetError: 'storeTeam/unsetError',
  storeAppendMember: 'storeTeam/appendMember',
  storeDeleteMember: 'storeTeam/deleteMember',
}

export const creators = {
  sagaCreate: createAction(types.sagaCreate),
  sagaAddUser: createAction(types.sagaAddUser),
  sagaDeleteUser: createAction(types.sagaDeleteUser),
  sagaGetTeam: createAction(types.sagaGetTeam),
  sagaGetFreeUsers: createAction(types.sagaGetFreeUsers),
  sagaDeleteTeam: createAction(types.sagaDeleteTeam),

  storeSetMembers: createAction(types.storeSetMembers),
  storeSetFreeUsers: createAction(types.storeSetFreeUsers),
  storeSetData: createAction(types.storeSetData),
  storeSetError: createAction(types.storeSetError),
  storeUnsetError: createAction(types.storeUnsetError),
  storeAppendMember: createAction(types.storeAppendMember),
  storeDeleteMember: createAction(types.storeDeleteMember),
}
