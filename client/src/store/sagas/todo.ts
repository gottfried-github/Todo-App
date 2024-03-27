import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { type Action } from 'redux-actions'
import axios from '../http'

import selectorsTodo from '../selectors/todo'

import {
  types as actionTypesSaga,
  type CreatePayload,
  type UpdateStatusPayload,
  type UpdateNamePayload,
  type DeleteOnePayload,
} from '../actions/sagas/todo'
import { types as actionTypesStore } from '../actions/store/todo'

class Item {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

function* create(action: Action<CreatePayload>): Generator<any, any, any> {
  const item = new Item(action.payload)

  try {
    const res = yield call(axios.post, '/todos', item)

    yield put({
      type: actionTypesStore.append,
      payload: res.data,
    })
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* updateStatus(action: Action<UpdateStatusPayload>): Generator<any, any, any> {
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
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* updateName(action: Action<UpdateNamePayload>): Generator<any, any, any> {
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
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* deleteOne(action: Action<DeleteOnePayload>): Generator<any, any, any> {
  try {
    yield call(axios.delete, `/todos/${action.payload}`)

    yield call(getItems)
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* deleteDone(): Generator<any, any, any> {
  try {
    yield call(axios.delete, '/todos')

    yield call(getItems)
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* getItems(): Generator<any, any, any> {
  const config: {
    params?: {
      sortField: string
      sortOrder: number
      page: number
      pageSize: number
      status?: number
    }
  } = {}

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
  } catch (e: any) {
    yield put({
      type: actionTypesStore.setError,
      payload: e.response?.data || { message: 'something went wrong' },
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
