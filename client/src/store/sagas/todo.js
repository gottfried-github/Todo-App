import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import axios from '../http'

import sliceTodo from '../store/slice-todo'
import sliceAuth from '../store/slice-auth'

import {
  create as actionCreate,
  updateStatus as actionUpdateStatus,
  updateName as actionUpdateName,
  deleteOne as actionDeleteOne,
  deleteDone as actionDeleteDone,
  getItems as actionGetItems,
} from '../actions/todo'

class Item {
  constructor(name) {
    this.name = name
  }
}

function* create(action) {
  const item = new Item(action.payload)

  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    const res = yield call(axios.post, '/todos', item, config)

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
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    yield call(
      axios.patch,
      `/todos/${action.payload.id}`,
      {
        status: action.payload.status,
      },
      config
    )

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
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    yield call(
      axios.patch,
      `/todos/${action.payload.id}`,
      {
        name: action.payload.name,
      },
      config
    )

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
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    yield call(axios.delete, `/todos/${action.payload}`, config)

    yield call(getItems)
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* deleteDone() {
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : null

  try {
    yield call(axios.delete, '/todos', config)

    yield call(getItems)
  } catch (e) {
    yield put({
      type: sliceTodo.actions.setError.type,
      payload: e,
    })
  }
}

function* getItems() {
  const token = yield select(state => sliceAuth.selectors.selectToken(state))

  const config = {}

  if (token) {
    config.headers = {
      authorization: `Bearer ${token}`,
    }
  }

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
