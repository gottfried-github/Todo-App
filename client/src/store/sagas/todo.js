import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from '../http'

import sliceTodo from '../store/slice-todo'

import {
  create as actionCreate,
  updateStatus as actionUpdateStatus,
  updateName as actionUpdateName,
  deleteOne as actionDeleteOne,
  deleteDone as actionDeleteDone,
  getItems as actionGetItems,
} from '../actions/sagas/todo'

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
      type: sliceTodo.actions.append.type,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* updateStatus(action) {
  try {
    yield call(axios.patch, `/todos/${action.payload.id}`, {
      userId: action.payload.userId,
      body: {
        status: action.payload.status,
      },
    })

    yield put({
      type: sliceTodo.actions.updateItem.type,
      payload: { id: action.payload.id, fields: { status: action.payload.status } },
    })
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* updateName(action) {
  try {
    yield call(axios.patch, `/todos/${action.payload.id}`, {
      userId: action.payload.userId,
      body: {
        name: action.payload.name,
      },
    })

    yield put({
      type: sliceTodo.actions.updateItem.type,
      payload: { id: action.payload.id, fields: { name: action.payload.name } },
    })
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteOne(action) {
  try {
    yield call(axios.delete, `/todos/${action.payload}`)

    yield call(getItems)
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteDone() {
  try {
    yield call(axios.delete, '/todos')

    yield call(getItems)
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* getItems() {
  const config = {}

  const filter = yield select(state => sliceTodo.selectors.selectFilter(state))

  config.params = {
    sortField: filter.sort.field,
    sortOrder: filter.sort.order,
    page: filter.pagination.page,
    pageSize: filter.pagination.pageSize,
  }

  if (filter.status) {
    config.params.status = filter.status
  }

  try {
    const res = yield call(axios.get, '/todos', config)

    yield put({
      type: sliceTodo.actions.setItems.type,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e.response?.data || 'something went wrong',
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
