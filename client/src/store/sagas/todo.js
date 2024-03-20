import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from '../http'

import { selectors as selectorsTodo } from '../store/slice-todo'

import { types as actionTypesSaga } from '../actions/sagas/todo'
import { types as actionTypesStore } from '../actions/store/todo'

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
      type: actionTypesStore.append,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
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
      type: actionTypesStore.updateItem,
      payload: { id: action.payload.id, fields: { status: action.payload.status } },
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
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
      type: actionTypesStore.updateItem,
      payload: { id: action.payload.id, fields: { name: action.payload.name } },
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
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
      type: actionTypesStore.setError,
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
      type: actionTypesStore.setError,
      payload: e,
    })
  }
}

function* getItems() {
  const config = {}

  const filter = yield select(state => selectorsTodo.selectFilter(state))

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
      type: actionTypesStore.setItems,
      payload: res.data,
    })
  } catch (e) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || 'something went wrong',
    })
  }
}

function* todos() {
  yield takeEvery(actionTypesSaga.create, create)
  yield takeLatest(actionTypesSaga.updateStatus, updateStatus)
  yield takeLatest(actionTypesSaga.updateName, updateName)
  yield takeLatest(actionTypesSaga.deleteOne, deleteOne)
  yield takeLatest(actionTypesSaga.deleteDone, deleteDone)
  yield takeEvery(actionTypesSaga.getItems, getItems)
}

export default todos
