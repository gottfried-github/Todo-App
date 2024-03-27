import { createAction } from 'redux-actions'

export const types = {
  // saga
  sagaCreate: 'sagaTodo/create',
  sagaUpdateStatus: 'sagaTodo/updateStatus',
  sagaUpdateName: 'sagaTodo/updateName',
  sagaDeleteOne: 'sagaTodo/deleteOne',
  sagaDeleteDone: 'sagaTodo/deleteDone',
  sagaGetItems: 'sagaTodo/getItems',

  // store
  storeSetItems: 'storeTodo/setItems',
  storeSetFilter: 'storeTodo/setFilter',
  storeSetError: 'storeTodo/setError',
  storeAppend: 'storeTodo/append',
  storeUpdateItem: 'storeTodo/updateItem',
  storeDeleteItem: 'storeTodo/deleteItem',
}

export const creators = {
  // saga
  sagaCreate: createAction(types.sagaCreate),
  sagaUpdateStatus: createAction(types.sagaUpdateStatus),
  sagaUpdateName: createAction(types.sagaUpdateName),
  sagaDeleteOne: createAction(types.sagaDeleteOne),
  sagaDeleteDone: createAction(types.sagaDeleteDone),
  sagaGetItems: createAction(types.sagaGetItems),

  // store
  storeSetItems: createAction(types.storeSetItems),
  storeSetFilter: createAction(types.storeSetFilter),
  storeSetError: createAction(types.storeSetError),
  storeAppend: createAction(types.storeAppend),
  storeUpdateItem: createAction(types.storeUpdateItem),
  storeDeleteItem: createAction(types.storeDeleteItem),
}
