import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { type Action } from 'redux-actions'
import axios from '../http'

import selectorsTodo from '../selectors/todo'

import { types as actionTypes } from '../actions/todo'
import {
  type SagaPayloadCreate,
  type SagaPayloadUpdateStatus,
  type SagaPayloadUpdateName,
  type SagaPayloadDeleteOne,
} from '../types/todo'

class Item {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

function* create(action: Action<SagaPayloadCreate>): Generator<any, any, any> {
  const counters = yield select(state => selectorsTodo.selectCounters(state))
  const filter = yield select(state => selectorsTodo.selectFilter(state))

  const item = new Item(action.payload)

  try {
    const res = yield call(axios.post, '/todos', item)

    yield put({
      type: actionTypes.storeAppend,
      payload: {
        item: res.data,
        counters,
        filter,
      },
    })
  } catch (e: any) {
    yield put({
      type: actionTypes.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* updateStatus(action: Action<SagaPayloadUpdateStatus>): Generator<any, any, any> {
  const items = yield select(state => selectorsTodo.selectItems(state))
  const filter = yield select(state => selectorsTodo.selectFilter(state))

  try {
    const res = yield call(axios.patch, `/todos/${action.payload.id}`, {
      userId: action.payload.userId,
      body: {
        status: action.payload.status,
      },
    })

    yield put({
      type: actionTypes.storeUpdateItem,
      payload: {
        item: res.data,
        itemsPrev: items,
        filter,
      },
    })
  } catch (e: any) {
    yield put({
      type: actionTypes.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* updateName(action: Action<SagaPayloadUpdateName>): Generator<any, any, any> {
  const items = yield select(state => selectorsTodo.selectItems(state))
  const filter = yield select(state => selectorsTodo.selectFilter(state))

  try {
    const res = yield call(axios.patch, `/todos/${action.payload.id}`, {
      userId: action.payload.userId,
      body: {
        name: action.payload.name,
      },
    })

    yield put({
      type: actionTypes.storeUpdateItem,
      payload: {
        item: res.data,
        itemsPrev: items,
        filter,
      },
    })
  } catch (e: any) {
    yield put({
      type: actionTypes.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* deleteOne(action: Action<SagaPayloadDeleteOne>): Generator<any, any, any> {
  try {
    const res = yield call(axios.delete, `/todos/${action.payload}`)

    yield put({
      type: actionTypes.storeDeleteItem,
      payload: { item: res.data },
    })
  } catch (e: any) {
    yield put({
      type: actionTypes.storeSetError,
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
      type: actionTypes.storeSetError,
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
      type: actionTypes.storeSetItems,
      payload: res.data.items,
    })

    yield put({
      type: actionTypes.storeSetCounters,
      payload: res.data.counters,
    })
  } catch (e: any) {
    yield put({
      type: actionTypes.storeSetError,
      payload: e.response?.data || { message: 'something went wrong' },
    })
  }
}

function* todos() {
  yield takeEvery(actionTypes.sagaCreate, create)
  yield takeLatest(actionTypes.sagaUpdateStatus, updateStatus)
  yield takeLatest(actionTypes.sagaUpdateName, updateName)
  yield takeLatest(actionTypes.sagaDeleteOne, deleteOne)
  yield takeLatest(actionTypes.sagaDeleteDone, deleteDone)
  yield takeEvery(actionTypes.sagaGetItems, getItems)
}

export default todos
