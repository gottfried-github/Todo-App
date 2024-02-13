import { createAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from './http'

import slice from './slice'

class Item {
  constructor(name) {
    this.name = name
  }
}

export const actions = {
  create: createAction('saga/create'),
  updateStatus: createAction('saga/updateStatus'),
  updateName: createAction('saga/updateName'),
  deleteOne: createAction('saga/deleteOne'),
  deleteDone: createAction('saga/deleteDone'),
  getItems: createAction('saga/getItems'),
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
    yield call(axios.delete, '/todos')

    yield put({
      type: slice.actions.deleteDone.type,
    })
  } catch (e) {
    yield put({
      type: slice.actions.setError.type,
      payload: e,
    })
  }
}

function* getItems() {
  try {
    const res = yield call(axios.get, '/todos')

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
  yield takeEvery(actions.create.type, create)
  yield takeLatest(actions.updateStatus.type, updateStatus)
  yield takeLatest(actions.updateName.type, updateName)
  yield takeLatest(actions.deleteOne.type, deleteOne)
  yield takeLatest(actions.deleteDone.type, deleteDone)
  yield takeLatest(actions.getItems.type, getItems)
}

export default todos
