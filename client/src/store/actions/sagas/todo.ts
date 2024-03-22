import { createAction } from 'redux-actions'

export const types = {
  create: 'sagaTodo/create',
  updateStatus: 'sagaTodo/updateStatus',
  updateName: 'sagaTodo/updateName',
  deleteOne: 'sagaTodo/deleteOne',
  deleteDone: 'sagaTodo/deleteDone',
  getItems: 'sagaTodo/getItems',
}

export const creators = {
  create: createAction(types.create),
  updateStatus: createAction(types.updateStatus),
  updateName: createAction(types.updateName),
  deleteOne: createAction(types.deleteOne),
  deleteDone: createAction(types.deleteDone),
  getItems: createAction(types.getItems),
}
