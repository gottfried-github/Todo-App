import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from './http'

import slice from './slice'

import {
  create as actionCreate,
  updateStatus as actionUpdateStatus,
  updateName as actionUpdateName,
  deleteOne as actionDeleteOne,
  deleteDone as actionDeleteDone,
  getItems as actionGetItems,
} from './actions'

class Item {
  constructor(name) {
    this.name = name
  }
}

function* create(action) {
  const item = new Item(action.payload)

  try {
    const res = yield call(axios.post, '/todos', item)

    yield put({
      type: slice.actions.append.type,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* updateStatus(action) {
  try {
    yield call(axios.patch, `/todos/${action.payload.id}`, {
      status: action.payload.status,
    })

    yield put({
      type: slice.actions.updateItem.type,
      payload: { id: action.payload.id, fields: { status: action.payload.status } },
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* updateName(action) {
  try {
    yield call(axios.patch, `/todos/${action.payload.id}`, {
      name: action.payload.name,
    })

    yield put({
      type: slice.actions.updateItem.type,
      payload: { id: action.payload.id, fields: { name: action.payload.name } },
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteOne(action) {
  try {
    yield call(axios.delete, `/todos/${action.payload}`)

    yield put({
      type: slice.actions.deleteItem.type,
      payload: action.payload,
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteDone() {
  try {
    const res = yield call(axios.delete, '/todos')

    yield put({
      type: slice.actions.deleteDone.type,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* getItems() {
  const filter = yield select(state => slice.selectors.selectFilter({ [slice.reducerPath]: state }))

  const params = { sortField: filter.sort.field, sortOrder: filter.sort.order }

  if (filter.status) {
    params.status = filter.status
  }

  try {
    const res = yield call(axios.get, '/todos', { params })

    yield put({
      type: slice.actions.setItems.type,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* todos() {
  yield takeEvery(actionCreate.type, create)
  yield takeLatest(actionUpdateStatus.type, updateStatus)
  yield takeLatest(actionUpdateName.type, updateName)
  yield takeLatest(actionDeleteOne.type, deleteOne)
  yield takeLatest(actionDeleteDone.type, deleteDone)
  yield takeEvery(actionGetItems.type, getItems)
}

export default todos
