import { createAction } from 'redux-actions'

export const types = {
  create: 'sagaTeam/create',
  addUser: 'sagaTeam/addUser',
  deleteUser: 'sagaTeam/deleteUser',
  getTeam: 'sagaTeam/getTeam',
  getFreeUsers: 'sagaTeam/getFreeUsers',
  deleteTeam: 'sagaTeam/delete',
}

export const creators = {
  create: createAction(types.create),
  addUser: createAction(types.addUser),
  deleteUser: createAction(types.deleteUser),
  getTeam: createAction(types.getTeam),
  getFreeUsers: createAction(types.getFreeUsers),
  deleteTeam: createAction(types.deleteTeam),
}
